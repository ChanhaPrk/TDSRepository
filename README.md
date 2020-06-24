# 2주차 범위 
1. CHAPTER 3 ArrayList 클래스      
    *분할상환분석에 대해 관련 내용을 보기전에 알아두기로하자.
    분할상환분석 : 알고리즘을 수행하는 경우에 필요한 시간을 비용으로 산정하고, 이 비용의 평균을 구하는 분석방법
> 3.1 MyArrayList 메서드 분류하기
<pre>
<code>
    public E get(int index){
        if( index < 0 || index >= size ){
            //throw는 강제로 예외를 발생시킵니다.
            //bounds : 범위 
            throw new IndexOutOfBoundsException();
        }
        return array[ index ]
    }
</code>
</pre>
   get메서드에 있는 모든 것은 상수 시간이빈다. 따라서 get 메서드는 상수 시간입니다.    
<pre>
<code>
    public E set(int index, E element ){
        E old = get( index );
        array[index] = element;
        return old;
    }
</code>   
</pre>
   set메서드는 인덱스가 유효하지 않으면 예외를 던지는 get메서드를 호출합니다.   
   get메서드 호출을 포함한 set메서드의 모든 것은 상수 시간입니다. 따라서 set 메서드도 상수 시간입니다.
   //왜 set메서드는 get메서드에 의존하는가?, 중복코드 사용을 방지하기 위함인가?
2. CHAPTER 4 LinkedList 클래스
3. CHAPTER 5 이중 연결 리스트