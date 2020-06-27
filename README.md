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
   (?)왜 set메서드는 get메서드에 의존하는가?, 중복코드 사용을 방지하기 위함인가?
<pre>
<code>
    public int indexOf( Object target ){
        for( int i = 0; i < size; i++ ){
            if( equals( target, array[i] ) ){
                return i;
            }
        }
        return -1;
    }
</code>
</pre>
<pre>
<code>
    private boolean equals( Object target, Object element ){
        if( target == null ){
            return element == null;
        }else{
            return target.equals(element);
        }
    }
</code>
</pre>
   배열의 크기에는 의존하지 않으므로 indexOf메서드를 분석하기 위해 equals메서드를 상수 시간으로 생각합니다.   
   (?)하필 배열의 index(크기)에 의존하지 않는가?   
   (?)결함도를 낮게 하기위해서인가 아니면 상수시간으로 생각하기 위해서인가?   
   평균적으로 요소 개수의 절반을 테스트하기를 기대합니다. 따라서 indexOf 메서드는 선형입니다.   
   (대상 요소가 배열의 시작에 있는 거의 일어나지 않을 경우는 제외)   
<pre>
<code>
    public E remove( int index ){
        E element = get(index);
        //size-1을 하는 이유는 
        //index는 배열의 마지막 1전까지 접근하여 
        //그 기준으로 +1을 참조하기때문에 
        //i < size을 for의 범위로 초기화 할 경우 array의 범위를 넘어서게 된다.
        for( int i = index; i < size-1; i++ ){
            array[i] = array[i+1];
        }
    }
</code>
</pre>
   상수 시간인 get 메서드를 사용하고 index부터 배열에 반복문을 실행합니다.    
   리스트의 마지막 요소를 제거하면 반복문은 실행되지 않고, 이 메서드는 상수 시간이 됩니다.    
   첫 번째 요소를 제거하면 나머지 모든 요소에 접근하여 선형이 됩니다. 따라서    
   remove메서드는 선형으로 간주합니다.    
> 3.2 add 메서드 분류하기    
<pre>
<code>
    public void add( int index, E element ){
        if( index < 0 || index > size ){
            //index가 -1이상이거나, 존재하는 사이즈보다 큰 index에 접근을 시도할 경우...
            throw new IndexOutOfBoundsException;
        }
        //크기 조정을 통해 요소를 추가합니다.
        add( element );
        
        //다른 요소를 시프트합니다.
        for( int i = size-1; i > index; i-- ){
            array[i] = array[i-1];
        }
        
        //올바른 자리에 새로운 값을 넣습니다.
        array[index] = element;
    }
</code>
</pre>
   (?)굳이 shit을 해야하는 이유는 무엇인가??
<pre>
<code>
    public boolean add( E element ){
        if( size >= array.length ){
            //큰 배열을 만들어 요소들을 복사합니다.
            E[] bigger = (E[])new Object[array.length * 2 ];
            System.arraycopy( array, 0, bigger, 0, array.length );
            array = bigger;
        }
        array[size] = element;
        size++;
        return true;
    }
</code>
</pre>
    배열에 미사용 공간이 있다면 add메서드는 상수 시간입니다.    
    하지만 배열의 크기를 변경하면 System.arraycopy메서드 호출 시 실행시간이 배열의    
    배열의 크기에 비례하기 때문에 add메서드는 선형입니다.    
    
    핵심은 배열의 크기를 조정할 때마다 배열의 길이가 2배로 는다는 것입니다.    
    이것으로 각 요소를 복사하는 횟수를 제한합니다. 그렇지 않고 고정된 양만큼 곱하는 대신에 고정된    
    양을 배열의 길이에 더한다면 이 분석은 맞지않습니다.
    
    핵심 개념은 일련의 호출을 하는 동안 배열을 복사하는 추가 비용이 분산되거나 분할 상환되었다는 것입니다.    
> 3.3 문제의 크기    
<pre>
<code>
    public boolean removeAll( Collection<?> collection ){
        boolean flag = false;
        //향상된 for
        for( Object obj : collection ){
            //???
            flag |= remove(obj);
        }
        
        return flag;
    }
</code>
</pre>
   문제 크기에 관해 이야기할 때 대상이 "어떤 크기"인지, 또는 "크기들"인지를 주의해야 합니다.    
   (?)크기라고 표현하면 하나인걸로 이해하겠는데 크기들이라고 표현하니 어떤 의미인지 정확히 잘 모르겠다.    
   반복문이 한 개라면 알고리즘은 보통 선형입니다. 반복문 두 개가 중첩되었다면 이 알고리즘은 보통 이차입니다.    
   하지만 주의하십시오!.    
   여러분은 각 반복문을 몇 번 실행하는지를 생각해야 합니다.    
   반복 횟수가 모든 반복문에서 n에 비례한다면 단지 반복문만 세면 끝입니다. 그러나 이 예제처럼 반복 횟수가    
   항상 n에 비례하지 않는다면 좀 더 고민해봐야 합니다.    
    
> 3.6 가비지 컬렉션    

   배열은 가비지 컬렉션을 하지 않고 그 요소도 리스트 자체가 파괴될 때까지 가비지 컬렉션대상이 아닙니다.    
   연결 리스트 구현의 한가지 장점은 요소를 제거하면 리스트 크기가 줄어들고    
   사용하지 않는 노드는 즉시 카비지 컬렉션이 될 수 있다는 것입니다.
<pre>
<code>
    public void clear(){
        head = null;
        size = 0;
    }
</code>
</pre>
   head 변수를 null로 만들면 첫번째 node에 대한 참조를 제거합니다.    
   해당 node에 대한 다른 참조가 없다면 가비지 컬렉션을 합니다. 이때 두 번째 node에 대한 참조가    
   제거되고 이것도 가비지 컬렉션을 합니다. 이 절차는 모든 노도를 가비지 컬렉션할 대까지 계속됩니다.    
    
   clear함수는 호출할 때는 요소의 개수에 비례하여 가비지 컬렉터가 동작합니다.    
   따라서 선형으로 간주해야 합니다.    
    
   (?)이것이 때때로 성능 버그라고 불리는 예입니다.    
   올바른 일을 한다는 점에서는 정확한 프로그램이지만, 증가 차수는 기대한 만큼 나오지 않습니다. 자바와 같은 언어는    
   가바지 컬렉션처럼 뒷단에서 많은 일을 하기 때문에 이런 종류의 버그를 찾아내기가 어렵습니다.    
2. CHAPTER 4 LinkedList 클래스   
3. CHAPTER 5 이중 연결 리스트    
> 5.5 자료구조 선택하기    

   ArrayList클래스의 유일한 이점은 get과 set 메서드 입니다.    
   연결리스트는 심지어 이중 연결 리스트일 때도 선형 시간이 필요합니다.    
    
   이러한 연산이 응용 프로그램의 실행시간에 뚜렷한 영향을 미치지 않는다면, 즉 응용 프로그램이 다른 일을 하느라    
   대부분 시간을 소모한다면 list구현에 대한 선택은 큰 의미가 없습니다.    
    
   공간에 대해서 잊지마세요.    
   지금까지 실행시간에 초점을 맞추었지만, 다른 구현은 다른 양의 공간이 필요합니다.    
   ArrayList에서 요소들은 한 덩어리의 메모리 안에 나란히 저장되어 거의 낭비되는 공간이 없고,    
   컴퓨터 하드웨어도 연속된 덩어리에서 종종 속도가 더 쁘랍니다. 연결리스트에서 각 요소는 하나 또는 두 개의 참조가 있는    
   노드가 필요합니다. 참조는 공간을 차지합니다. 메모리 여기저기에 노드가 흩어져 있으면 하드웨어의 효율이 떨어질 수 있습니다.    
   알고리즘 분석은 자료구조를 선택하는 지침을 제공하지만, 오직 다음 조건일 때만 유효합니다.
      1. 응용 프로그램의 실행시간이 중요하다.    
      2. 응용 프로그램의 실행시간이 선택한 자료구조에 의존합니다.    
      3. 증가 차수에 따라 어느 자료구조가 나은지 실제로 예측할 수 있을 만큼 문제 크기가 충분히 크다.
