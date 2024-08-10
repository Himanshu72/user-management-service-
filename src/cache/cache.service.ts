import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async makeCachable(key: string, getter: () => Promise<any>): Promise<any> {
        // Try to get the cached data
        const cachedData = await this.cacheManager.get(key);
        if (cachedData) {
            return cachedData;
        }

        // If not cached, fetch the data using the getter function
        const data = await getter();

        // Store the fetched data in cache with TTL directly
        await this.cacheManager.set(key, data);

        return data;
    }

    async markInvaliCatch(){
        await this.cacheManager.reset();
    }
}
