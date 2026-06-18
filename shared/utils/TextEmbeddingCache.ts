import { File, Paths } from 'expo-file-system';

const CACHE_FILE_NAME = 'text_embeddings_cache.json';

export class TextEmbeddingCache {
  private static memoryCache: Record<string, number[]> | null = null;

  private static getCacheFile(): File {
    return new File(Paths.document, CACHE_FILE_NAME);
  }

  /**
   * Loads the text embedding cache from disk. If already loaded in memory, returns it immediately.
   */
  public static async loadCache(): Promise<Record<string, number[]>> {
    if (this.memoryCache) return this.memoryCache;

    try {
      const file = this.getCacheFile();
      if (file.exists) {
        const content = await file.text();
        this.memoryCache = JSON.parse(content);
        console.log(`[TextEmbeddingCache] Loaded ${Object.keys(this.memoryCache || {}).length} embeddings from disk.`);
        return this.memoryCache as Record<string, number[]>;
      } else {
        console.log('[TextEmbeddingCache] No cache file found on disk. Starting fresh.');
      }
    } catch (e) {
      console.warn('[TextEmbeddingCache] Failed to load cache from disk:', e);
    }
    
    this.memoryCache = {};
    return this.memoryCache;
  }

  /**
   * Saves the current memory cache back to disk.
   */
  public static async saveCache(): Promise<void> {
    if (!this.memoryCache) return;
    try {
      const file = this.getCacheFile();
      if (!file.exists) {
        file.create();
      }
      file.write(JSON.stringify(this.memoryCache));
      console.log(`[TextEmbeddingCache] Saved ${Object.keys(this.memoryCache).length} embeddings to disk.`);
    } catch (e) {
      console.warn('[TextEmbeddingCache] Failed to save cache to disk:', e);
    }
  }

  /**
   * Computes the final text embeddings for a given set of actions.
   * If an action maps to multiple prompts, their embeddings are averaged and L2-normalized.
   * Prompts are cached individually to disk.
   * 
   * @param textModel The inference model instance that has a `.forward(prompt: string)` returning an array-like numeric object.
   * @param actionsConfig A mapping of Action Name -> Single prompt string OR array of prompt strings.
   * @returns A mapping of Action Name -> Final Normalized Embedding (number[])
   */
  public static async getEnsembledEmbeddings(
    textModel: any, 
    actionsConfig: Record<string, string | string[]>
  ): Promise<Record<string, number[]>> {
    const cache = await this.loadCache();
    let cacheUpdated = false;
    
    const finalEmbeddings: Record<string, number[]> = {};

    for (const [actionName, promptsVal] of Object.entries(actionsConfig)) {
      const prompts = Array.isArray(promptsVal) ? promptsVal : [promptsVal];
      console.log(`[TextEmbeddingCache] Processing action: '${actionName}' (${prompts.length} prompts)`);
      let sum: number[] = [];

      for (const prompt of prompts) {
        // 1. Fetch from cache or compute
        let vec = cache[prompt];
        if (!vec) {
          console.log(`  -> [Miss] Computing embedding for: "${prompt.slice(0, 30)}..."`);
          const result = await textModel.forward(prompt);
          vec = Array.from(result) as number[];
          cache[prompt] = vec;
          cacheUpdated = true;
        } else {
          // Optional: You can comment this out if it's too noisy
          // console.log(`  -> [Hit] Loaded from cache: "${prompt.slice(0, 30)}..."`);
        }

        // 2. Add to sum
        if (sum.length === 0) {
          sum = new Array(vec.length).fill(0);
        }
        for (let i = 0; i < vec.length; i++) {
          sum[i] += vec[i];
        }
      }

      // 3. Average and normalize the ensembled vector
      let sqSum = 0;
      sum = sum.map(v => { 
        const avgVal = v / prompts.length; 
        sqSum += avgVal * avgVal; 
        return avgVal; 
      });
      
      const norm = Math.sqrt(sqSum) || 1e-8;
      finalEmbeddings[actionName] = sum.map(v => v / norm);
    }

    // Persist if new prompts were added
    if (cacheUpdated) {
      console.log('[TextEmbeddingCache] Cache was updated with new embeddings. Persisting to disk...');
      await this.saveCache();
    } else {
      console.log('[TextEmbeddingCache] All requested embeddings were found in cache.');
    }

    return finalEmbeddings;
  }
}
