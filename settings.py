import redis

ES_ENDPOINT = "http://elasticsearch:9200"
REDIS_ENDPOINT = "http://redis:6379"
NEWS_SOURCES_QUEUE = "NEWS_SOURCES_QUEUE"
NEWS_BRIEF_QUEUE = "NEWS_BRIEF_QUEUE"
NEWS_DETAIL_QUEUE = "NEWS_DETAIL_QUEUE"

redis_pool = redis.ConnectionPool(host='redis', port=6379, db=0)
redis_client = redis.Redis(connection_pool=redis_pool)
