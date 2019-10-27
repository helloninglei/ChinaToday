from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor, wait

from downLoader import articleDownLoader
from sourceGatherer import govementNewsGatherer

process_executor = ProcessPoolExecutor(10)

origin_source_url = "http://sousuo.gov.cn/column/30611/0.htm"
gatherer = govementNewsGatherer(origin_source_url)
loader = articleDownLoader()

def main():
    thread_executor = ThreadPoolExecutor(10)
    future1 = thread_executor.submit(gatherer.process)
    future2 = thread_executor.submit(loader.process)

    wait([future1, future2])


if __name__ == "__main__":
    main()
