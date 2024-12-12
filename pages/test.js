import React, { useState, useEffect } from "react";
import '@/app/globals.css';
import { useRouter } from 'next/router';

// SVG component for timer
const TimerSVG = ({ timeLeft }) => {
  const radius = 40;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / 60) * circumference;
  return (
    <svg width={100} height={100} className="timer-svg">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#eee"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="green"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
};

const questionsData = {
  Python: [
    {
      question: "Which of the following is a valid Python data type?",
      options: ["Array", "List", "Queue", "Stack"],
      answer: "List",
    },
    {
      question: "What is the time complexity of searching in a balanced binary search tree?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "What is the output of list(range(0, 10, 2))?",
      options: ["[0, 2, 4, 6, 8, 10]", "[0, 2, 4, 6, 8]", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8, 10]"],
      answer: "[0, 2, 4, 6, 8]",
    },
    {
      question: "What is the result of the expression len('Hello')?",
      options: ["4", "5", "6", "3"],
      answer: "5",
    },
    {
      question: "Which of the following is a Python function to add an element to a list?",
      options: ["append()", "add()", "push()", "insert()"],
      answer: "append()",
    },
    // Add the other Python questions here...
  ],
  Java: [
    {
      question: "What is the output of the following Java code: `System.out.println(3 + 2 * 2);`?",
      options: ["7", "10", "5", "8"],
      answer: "7",
    },
    {
      question: "Which of the following keywords is used to prevent a class from being subclassed?",
      options: ["final", "static", "private", "abstract"],
      answer: "final",
    },
    {
      question: "What is the default value of a boolean variable in Java?",
      options: ["true", "false", "0", "null"],
      answer: "false",
    },
    {
      question: "Which of the following is not a valid Java data type?",
      options: ["int", "double", "float", "number"],
      answer: "number",
    },
    {
      question: "What is the purpose of the `transient` keyword in Java?",
      options: [
        "To mark a method as abstract",
        "To prevent serialization of a variable",
        "To define a constant variable",
        "To create a thread-safe class"
      ],
      answer: "To prevent serialization of a variable",
    },
    {
      question: "What will be the output of the following Java code: `String str = 'Java'; System.out.println(str.substring(1, 3));`?",
      options: ["Ja", "av", "va", "a"],
      answer: "av",
    },
    {
      question: "Which method is used to start a thread in Java?",
      options: ["run()", "start()", "execute()", "init()"],
      answer: "start()",
    },
    {
      question: "Which of the following is used to handle exceptions in Java?",
      options: ["throw", "try-catch", "exception", "handle"],
      answer: "try-catch",
    },
    {
      question: "What is the output of the following code: `System.out.println(3.0 / 2);`?",
      options: ["1.5", "1", "1.0", "Error"],
      answer: "1.5",
    },
    {
      question: "Which method is used to convert a string to a number in Java?",
      options: ["parseInt()", "toInteger()", "parseFloat()", "convert()"],
      answer: "parseInt()",
    },
    {
      question: "What is the purpose of the `super` keyword in Java?",
      options: [
        "To refer to the parent class",
        "To define a constructor",
        "To call the subclass method",
        "To refer to the current class"
      ],
      answer: "To refer to the parent class",
    },
    {
      question: "Which of the following is not a valid access modifier in Java?",
      options: ["public", "private", "protected", "global"],
      answer: "global",
    },
    {
      question: "Which method is used to compare two strings in Java?",
      options: ["==", "compareTo()", "equals()", "compare()"],
      answer: "equals()",
    },
    {
      question: "What is the default value of an instance variable of type `int` in Java?",
      options: ["0", "1", "null", "undefined"],
      answer: "0",
    },
    {
      question: "What is the purpose of the `final` keyword in Java?",
      options: [
        "To mark a class as abstract",
        "To mark a method as static",
        "To mark a variable as constant",
        "To mark a method as private"
      ],
      answer: "To mark a variable as constant",
    },
    {
      question: "Which of the following is a feature of Java?",
      options: [
        "Platform-dependent",
        "Object-oriented",
        "Non-distributed",
        "Uses pointers"
      ],
      answer: "Object-oriented",
    },
    {
      question: "Which of the following is used to define a package in Java?",
      options: ["package", "import", "define", "export"],
      answer: "package",
    },
    {
      question: "What is the purpose of the `this` keyword in Java?",
      options: [
        "Refers to the current instance of a class",
        "Refers to the superclass",
        "Refers to the parent method",
        "Refers to the constructor"
      ],
      answer: "Refers to the current instance of a class",
    },
    {
      question: "Which of the following classes is part of the `java.util` package?",
      options: ["ArrayList", "String", "Integer", "System"],
      answer: "ArrayList",
    },
    {
      question: "What is the result of `10 / 3` in Java?",
      options: ["3.0", "3", "3.3333", "Error"],
      answer: "3",
    },
    {
      question: "Which of the following is true about Java arrays?",
      options: [
        "Arrays in Java are dynamically sized",
        "Arrays can only store primitive data types",
        "Arrays are indexed from 1",
        "Arrays can store elements of the same type only"
      ],
      answer: "Arrays can store elements of the same type only",
    },
    {
      question: "Which of the following methods is used to find the length of a string in Java?",
      options: ["length()", "size()", "getLength()", "length"],
      answer: "length()",
    },
    {
      question: "What will be the output of the following code: `String str = 'Hello'; System.out.println(str.charAt(2));`?",
      options: ["H", "e", "l", "o"],
      answer: "l",
    },
    {
      question: "What is the output of the following Java code: `int[] arr = {1, 2, 3}; System.out.println(arr.length);`?",
      options: ["3", "1", "2", "Error"],
      answer: "3",
    },
    {
      question: "Which of the following is used to start a thread in Java?",
      options: ["start()", "run()", "initialize()", "create()"],
      answer: "start()",
    },
    {
      question: "What will be the output of the following Java code: `System.out.println(2 + 3 + '4');`?",
      options: ["23", "54", "7", "Error"],
      answer: "23",
    },
    {
      question: "What is the purpose of the `clone()` method in Java?",
      options: [
        "To duplicate an object",
        "To initialize a new object",
        "To delete an object",
        "To compare two objects"
      ],
      answer: "To duplicate an object",
    },
    {
      question: "Which of the following statements about Java interfaces is correct?",
      options: [
        "Interfaces can contain method implementations",
        "Interfaces cannot extend other interfaces",
        "A class can implement multiple interfaces",
        "Interfaces cannot be inherited"
      ],
      answer: "A class can implement multiple interfaces",
    },
    {
      question: "What is the output of the following code: `System.out.println('a' + 1);`?",
      options: ["97", "98", "99", "100"],
      answer: "98",
    },
    {
      question: "Which of the following exceptions is thrown when an array index is out of bounds?",
      options: ["ArrayIndexOutOfBoundsException", "NullPointerException", "IllegalArgumentException", "ClassCastException"],
      answer: "ArrayIndexOutOfBoundsException",
    },
    {
      question: "Which of the following is not a valid identifier in Java?",
      options: ["_variable", "$variable", "1variable", "variable1"],
      answer: "1variable",
    },
    {
      question: "What will be the output of the following Java code: `System.out.println(5.0 / 2);`?",
      options: ["2.5", "2", "3", "Error"],
      answer: "2.5",
    },
    {
      question: "Which of the following is not a valid method to synchronize a block of code in Java?",
      options: ["synchronized block", "synchronized method", "using locks", "using semaphores"],
      answer: "using semaphores",
    },
    {
      question: "Which of the following collections does not allow duplicates?",
      options: ["List", "Set", "Queue", "Deque"],
      answer: "Set",
    },
    {
      question: "Which method is used to get the class of an object in Java?",
      options: ["getClass()", "getObject()", "class()", "objectClass()"],
      answer: "getClass()",
    },
    {
      question: "What is the default value of a local variable in Java?",
      options: ["null", "0", "undefined", "No default value"],
      answer: "No default value",
    },
    {
      question: "Which of the following methods is used to stop a thread in Java?",
      options: ["stop()", "pause()", "terminate()", "exit()"],
      answer: "stop()",
    },
  ],
  C: [
    {
      question: "What is the output of the following code: `int a = 5; printf('%d', a++);`?",
      options: ["5", "6", "Error", "undefined behavior"],
      answer: "5",
    },
    {
      question: "Which of the following is true about the `malloc` function?",
      options: [
        "It initializes memory to zero",
        "It returns a pointer to allocated memory",
        "It automatically frees allocated memory",
        "None of the above"
      ],
      answer: "It returns a pointer to allocated memory",
    },
    {
      question: "What is the result of the following C code: `int x = 10; printf('%d', ++x + x++);`?",
      options: ["21", "22", "20", "23"],
      answer: "21",
    },
    {
      question: "Which of the following is the correct way to declare a constant pointer to an integer in C?",
      options: [
        "int const *ptr;",
        "const int *ptr;",
        "int *const ptr;",
        "const *int ptr;"
      ],
      answer: "int *const ptr;",
    },
    {
      question: "What will be the output of the following code: `int i = 0; printf('%d', ++i + ++i);`?",
      options: ["1", "2", "3", "Undefined behavior"],
      answer: "Undefined behavior",
    },
    {
      question: "Which function is used to get the length of a string in C?",
      options: ["strlen()", "sizeof()", "strlength()", "length()"],
      answer: "strlen()",
    },
    {
      question: "What will the following C code print? `int arr[] = {1, 2, 3}; printf('%d', *arr + 1);`",
      options: ["1", "2", "3", "Error"],
      answer: "2",
    },
    {
      question: "Which of the following C constructs is used to handle errors?",
      options: ["try-catch", "throw", "exception", "setjmp-longjmp"],
      answer: "setjmp-longjmp",
    },
    {
      question: "What is the size of a pointer on a 64-bit machine?",
      options: ["4 bytes", "8 bytes", "16 bytes", "Depends on the type of pointer"],
      answer: "8 bytes",
    },
    {
      question: "In C, what is the default value of an uninitialized static variable?",
      options: ["0", "1", "NULL", "Undefined"],
      answer: "0",
    },
    {
      question: "Which of the following C functions is used to allocate memory dynamically?",
      options: ["malloc()", "calloc()", "realloc()", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "What is the result of the following C expression: `printf('%d', 5 + 5 * 2);`?",
      options: ["15", "10", "20", "25"],
      answer: "15",
    },
    {
      question: "What is the value of `x` after the following C code executes? `int x = 5; x = x++ + ++x;`",
      options: ["10", "11", "12", "Undefined behavior"],
      answer: "Undefined behavior",
    },
    {
      question: "Which of the following is not a valid way to pass arguments to a function in C?",
      options: ["By reference", "By value", "By pointer", "All of the above are valid"],
      answer: "All of the above are valid",
    },
    {
      question: "In C, how do you declare an array of 10 integers?",
      options: ["int arr[10];", "int[10] arr;", "int arr(10);", "int arr{10};"],
      answer: "int arr[10];",
    },
    {
      question: "What will be the output of the following code: `int a = 5, b = 2; printf('%d', a / b);`?",
      options: ["2.5", "2", "3", "Error"],
      answer: "2",
    },
    {
      question: "Which of the following is true about the `free()` function in C?",
      options: [
        "It deallocates the memory assigned to a pointer",
        "It initializes memory to zero",
        "It automatically reallocates memory",
        "None of the above"
      ],
      answer: "It deallocates the memory assigned to a pointer",
    },
    {
      question: "What will be the output of the following C code: `int i = 10; printf('%d', i++ * 2);`?",
      options: ["20", "22", "18", "10"],
      answer: "20",
    },
    {
      question: "Which of the following is the correct way to define a function prototype in C?",
      options: [
        "int add(int a, int b);",
        "int add(a, b) int a, b;",
        "void add(int a, int b);",
        "void add(a, b);"
      ],
      answer: "int add(int a, int b);",
    },
    {
      question: "What is the result of the following C code: `int a = 10; printf('%d', ++a * 5);`?",
      options: ["50", "55", "10", "5"],
      answer: "55",
    },
    {
      question: "What is the output of the following C code: `int a = 10; printf('%d', a++ + a++);`?",
      options: ["20", "21", "22", "Undefined behavior"],
      answer: "Undefined behavior",
    },
    {
      question: "Which of the following is a feature of C?",
      options: ["Object-oriented", "Low-level memory manipulation", "Garbage collection", "Automatic memory management"],
      answer: "Low-level memory manipulation",
    },
    {
      question: "What is the result of the following C code: `int x = 3; printf('%d', ++x * x--);`?",
      options: ["6", "9", "12", "Undefined behavior"],
      answer: "6",
    },
    {
      question: "What is the difference between `++x` and `x++` in C?",
      options: [
        "There is no difference",
        "`++x` increments the value before usage, `x++` increments after usage",
        "`x++` increments the value before usage, `++x` increments after usage",
        "None of the above"
      ],
      answer: "`++x` increments the value before usage, `x++` increments after usage",
    },
    {
      question: "What is the result of the following C code: `int x = 5; printf('%d', x++ * ++x);`?",
      options: ["30", "35", "25", "Undefined behavior"],
      answer: "Undefined behavior",
    },
    {
      question: "What is the output of the following code? `int a = 5; printf('%d', a && 0);`",
      options: ["5", "0", "1", "Error"],
      answer: "0",
    },
    {
      question: "What is the output of the following C code: `int x = 4; printf('%d', x & 3);`?",
      options: ["0", "1", "2", "3"],
      answer: "0",
    },
    {
      question: "What is the size of the `int` data type in C on a 32-bit machine?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the compiler"],
      answer: "4 bytes",
    },
    {
      question: "What will the following code print? `int x = 10; int *p = &x; printf('%d', *p);`",
      options: ["10", "x", "Error", "Undefined behavior"],
      answer: "10",
    },
    {
      question: "Which of the following is true about C functions?",
      options: [
        "A function must always return a value",
        "A function can return only one value",
        "A function can accept multiple return types",
        "A function can return multiple values using pointers"
      ],
      answer: "A function can return multiple values using pointers",
    },
    {
      question: "What is the result of the following C code: `int x = 1, y = 2; printf('%d', x & y);`?",
      options: ["0", "1", "2", "3"],
      answer: "0",
    },
    {
      question: "Which operator is used for bitwise XOR in C?",
      options: ["^", "&", "|", "~"],
      answer: "^",
    },
    {
      question: "What will the following code print? `int arr[] = {10, 20, 30}; printf('%d', *(arr + 1));`",
      options: ["10", "20", "30", "Undefined behavior"],
      answer: "20",
    },
    {
      question: "What is the use of `typedef` in C?",
      options: [
        "To create an alias for a data type",
        "To define functions",
        "To declare variables",
        "To define constants"
      ],
      answer: "To create an alias for a data type",
    },
  ],
  DSA: [
    {
      question: "What is the time complexity of accessing an element in an array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "Which of the following is not a type of tree in data structures?",
      options: ["Binary Tree", "AVL Tree", "Red-Black Tree", "Heap Tree"],
      answer: "Heap Tree",
    },
    {
      question: "What is the best case time complexity for QuickSort?",
      options: ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"],
      answer: "O(n log n)",
    },
    {
      question: "Which data structure is used for implementing recursion?",
      options: ["Queue", "Stack", "Linked List", "Array"],
      answer: "Stack",
    },
    {
      question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "Which of the following is a stable sorting algorithm?",
      options: ["QuickSort", "MergeSort", "HeapSort", "SelectionSort"],
      answer: "MergeSort",
    },
    {
      question: "Which of the following is an example of a greedy algorithm?",
      options: ["Dijkstra's Algorithm", "MergeSort", "Binary Search", "QuickSort"],
      answer: "Dijkstra's Algorithm",
    },
    {
      question: "Which of the following operations is expensive for a linked list compared to an array?",
      options: ["Accessing an element", "Inserting an element", "Deleting an element", "None of the above"],
      answer: "Accessing an element",
    },
    {
      question: "In which data structure is the heap used?",
      options: ["Stack", "Queue", "Priority Queue", "Linked List"],
      answer: "Priority Queue",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "Which of the following is not a characteristic of a graph?",
      options: ["Nodes", "Edges", "Weight", "Queue"],
      answer: "Queue",
    },
    {
      question: "Which algorithm is used for finding the shortest path in a graph?",
      options: ["Bellman-Ford", "QuickSort", "MergeSort", "Breadth-First Search"],
      answer: "Bellman-Ford",
    },
    {
      question: "In a binary tree, what is the maximum number of nodes at level 'l'?",
      options: ["2^l", "l^2", "2^l - 1", "l"],
      answer: "2^l",
    },
    {
      question: "Which of the following is not a valid tree traversal method?",
      options: ["In-order", "Pre-order", "Post-order", "Breadth-order"],
      answer: "Breadth-order",
    },
    {
      question: "Which of the following is a property of a max heap?",
      options: ["Parent node is always smaller than child nodes", "Parent node is always larger than child nodes", "Each node is less than its sibling", "None of the above"],
      answer: "Parent node is always larger than child nodes",
    },
    {
      question: "What is the time complexity of accessing an element in a hash table?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answer: "O(1)",
    },
    {
      question: "What type of algorithm is MergeSort?",
      options: ["Divide and conquer", "Greedy", "Dynamic programming", "Backtracking"],
      answer: "Divide and conquer",
    },
    {
      question: "Which data structure is used to implement a depth-first search (DFS)?",
      options: ["Queue", "Stack", "Linked List", "Array"],
      answer: "Stack",
    },
    {
      question: "Which of the following is an advantage of a doubly linked list over a singly linked list?",
      options: ["Faster traversal", "Less memory usage", "Easier insertion and deletion", "None of the above"],
      answer: "Easier insertion and deletion",
    },
    {
      question: "Which of the following is true for a circular linked list?",
      options: ["The last node points to the first node", "The first node points to the last node", "There are no next pointers", "None of the above"],
      answer: "The last node points to the first node",
    },
    {
      question: "What is the main disadvantage of a stack data structure?",
      options: ["It allows random access to elements", "It is difficult to implement", "It follows LIFO order", "It has a fixed size"],
      answer: "It follows LIFO order",
    },
    {
      question: "Which of the following is not a type of graph traversal?",
      options: ["Depth-first search", "Breadth-first search", "Hashing", "None of the above"],
      answer: "Hashing",
    },
    {
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      answer: "O(n^2)",
    },
    {
      question: "What is the space complexity of MergeSort?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(n)",
    },
    {
      question: "Which data structure is typically used for a breadth-first search (BFS)?",
      options: ["Queue", "Stack", "Array", "Hash Table"],
      answer: "Queue",
    },
    {
      question: "Which of the following is not a type of linked list?",
      options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Binary Linked List"],
      answer: "Binary Linked List",
    },
    {
      question: "What is the primary advantage of a hash table?",
      options: ["Fast access", "Ordered data", "Efficient memory usage", "None of the above"],
      answer: "Fast access",
    },
    // Additional DSA questions
    {
      question: "Which sorting algorithm works by repeatedly selecting the minimum element from the unsorted part?",
      options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"],
      answer: "Selection Sort",
    },
    {
      question: "In a binary search tree, what is the property of the left child node?",
      options: ["It is greater than the parent node", "It is less than the parent node", "It is equal to the parent node", "None of the above"],
      answer: "It is less than the parent node",
    },
    {
      question: "Which algorithm is most efficient for sorting an array of size n?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
      answer: "Merge Sort",
    },
    {
      question: "What is the main difference between a stack and a queue?",
      options: ["A stack uses LIFO and a queue uses FIFO", "A stack uses FIFO and a queue uses LIFO", "Both are the same", "None of the above"],
      answer: "A stack uses LIFO and a queue uses FIFO",
    },
    {
      question: "What is the time complexity of the Breadth-First Search (BFS) algorithm?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(n + m)"],
      answer: "O(n + m)",
    },
    {
      question: "Which of the following algorithms is used for finding the minimum spanning tree of a graph?",
      options: ["Dijkstra’s Algorithm", "Prim’s Algorithm", "Bellman-Ford", "Kruskal’s Algorithm"],
      answer: "Prim’s Algorithm",
    },
    {
      question: "In a doubly linked list, what is stored in each node?",
      options: ["Only data", "Data and next pointer", "Data, next pointer, and previous pointer", "Data and previous pointer"],
      answer: "Data, next pointer, and previous pointer",
    },
    {
      question: "What is the time complexity of searching for an element in a binary search tree?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(log n)",
    },
    {
      question: "Which of the following is an example of a dynamic programming problem?",
      options: ["Fibonacci sequence", "QuickSort", "MergeSort", "Dijkstra’s algorithm"],
      answer: "Fibonacci sequence",
    },
    {
      question: "Which algorithm is used to detect a cycle in a directed graph?",
      options: ["DFS", "BFS", "Kruskal’s Algorithm", "Dijkstra’s Algorithm"],
      answer: "DFS",
    },
    {
      question: "What is the worst-case time complexity of inserting an element into a balanced binary search tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answer: "O(log n)",
    },
  ],
};

export default function TestPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [lastTestTime, setLastTestTime] = useState(null);
  const [exitAttempts, setExitAttempts] = useState(0);
  const router = useRouter();
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  useEffect(() => {
    // Prevent tab switching during the test
    if (isTestActive) {
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = '';
      });
    } else {
      window.removeEventListener('beforeunload', () => {});
    }

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, [isTestActive]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');

      if (!document.visibilityState === 'visible' && !testCompleted) {
        // User switched tabs or minimized the window, end the test
        setTestCompleted(true);
        router.push('/dashboard/freelancer');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [testCompleted, router]);

  const handleEscKey = (event) => {
    if (!isFullscreen || event.keyCode !== 27) return;
  
    // Confirmation before exiting fullscreen on Esc press
    if (confirm("Are you sure you want to exit the test?")) {
      setTestCompleted(true);
      router.push('/dashboard/freelancer'); 
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);
  
    // Handle exiting fullscreen mode on unmount
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [testCompleted, router]);
  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !testCompleted) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        setTestCompleted(true);
        clearInterval(timer);
        router.push('/dashboard/freelancer'); // Redirect when timer ends
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, testCompleted, router]);

  useEffect(() => {
    const storedLastTestTime = localStorage.getItem("lastTestTime");
    if (storedLastTestTime) {
      setLastTestTime(new Date(storedLastTestTime));
    }

    const storedExitAttempts = localStorage.getItem("exitAttempts");
    if (storedExitAttempts) {
      setExitAttempts(Number(storedExitAttempts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exitAttempts", exitAttempts);
  }, [exitAttempts]);
  const handleAnswer = (option) => {
    const currentQuestion = questionsData[selectedTopic][currentQuestionIndex];
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore(score + 1);

    // Delay before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questionsData[selectedTopic].length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setTestCompleted(true);
        const now = new Date();
        localStorage.setItem("lastTestTime", now.toISOString());
        setLastTestTime(now);
      }
      setSelectedAnswer(null);
      setAnswerStatus(null);
    }, 1000);
  };

  const startTest = (topic) => {
    const now = new Date();
    setIsTestActive(true);
    if (lastTestTime && now - lastTestTime < 3600000) { // 1 hour in milliseconds
      alert("You can only retake the test after 1 hour.");
      return;
    }
  
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(60);
    setTestCompleted(false);
    setExitAttempts(0); // Reset exit attempts when starting a new test
    localStorage.setItem("exitAttempts", 0);
  
    // Enter fullscreen mode
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const handleExit = () => {
    setIsTestActive(false);
    if (exitAttempts >= 2) {
      alert("You cannot exit the test more than twice.");
      return;
    }
    const updatedAttempts = exitAttempts + 1;
    setExitAttempts(updatedAttempts);
    localStorage.setItem("exitAttempts", updatedAttempts);
    router.push('/dashboard/freelancer');
  };
 // Example SVG icons for the topics
const icons = {
    Python: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.1 2a3.003 3.003 0 00-2.835 2H10C5.037 4 2 7.038 2 12c0 4.962 3.038 8 8 8h1v-5H9v-1h5a2 2 0 002-2V7.165A3.003 3.003 0 0014.1 2zM14 6.1A1.1 1.1 0 1115.1 7 1.102 1.102 0 0114 6.1zm-4 4h2v2h-2zM12 22a3.003 3.003 0 002.835-2H14c4.963 0 8-3.038 8-8 0-4.962-3.037-8-8-8h-1v5h4v1h-5a2 2 0 00-2 2v4.835A3.003 3.003 0 0011.9 22zM10 17.9A1.1 1.1 0 1111.1 19 1.102 1.102 0 0110 17.9zm2-4h-2v-2h2z" />
      </svg>
    ),
    C: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.052 10H18a7 7 0 100 4h1.052A9.92 9.92 0 0120 15.025c-.238.206-.493.417-.764.62-.313.24-.637.466-.98.676A9.99 9.99 0 0012 20c-2.03 0-3.928-.61-5.5-1.681-.527-.347-1.038-.755-1.5-1.201C2.226 15.68 2 13.879 2 12s.226-3.68.5-5.118c.462-.446.973-.854 1.5-1.201A9.99 9.99 0 0112 4a9.99 9.99 0 014.756 1.679c.343.21.667.436.98.676.27.203.526.414.764.62A9.92 9.92 0 0120 8.975 9.999 9.999 0 0019.052 10z" />
      </svg>
    ),
    DSA: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-8 16.53V22a2 2 0 002 2h2.053A10 10 0 1012 2zm0 18.93a8.004 8.004 0 016.273-8.247l-3.153-3.153L12 14.07 8.88 8.53l1.06-1.06L12 11.82l1.12-4.35a8 8 0 01-1.12 13.46z" />
      </svg>
    ),
    Java: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3.19A8.812 8.812 0 013.19 12 8.812 8.812 0 0112 20.81 8.812 8.812 0 0120.81 12 8.812 8.812 0 0112 3.19zM12 19a7.021 7.021 0 010-14c1.525 0 2.952.483 4.13 1.289a4.758 4.758 0 00-.558 3.038h-3.572a.5.5 0 100 1h4.198c.145 2.275.898 3.73 2.07 4.37-.136.437-.305.854-.497 1.249-1.178.803-2.605 1.286-4.131 1.286a7.021 7.021 0 01-4.13-1.289A4.758 4.758 0 008.49 9.673h3.573a.5.5 0 100-1H7.864c-.145-2.275-.897-3.73-2.069-4.37.136-.437.305-.854.497-1.249A7.021 7.021 0 0112 5z" />
      </svg>
    ),
  };
  
  if (!selectedTopic) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-8xl bg-white p-8 rounded-md shadow-md" style={{ height: "600px" }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Select a Topic
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-16 h-full">
            {Object.keys(questionsData).map((topic) => (
              <button
                key={topic}
                className="w-64 h-64 rounded-lg bg-blue-500 pt-30 text-white hover:bg-blue-600 transition-all flex flex-col items-center justify-center"
                onClick={() => 
                console.log("clicke")
                }
              >
                {icons[topic]}
                <span className="mt-2">{topic}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const currentQuestion = questionsData[selectedTopic][currentQuestionIndex];
  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white p-8 rounded-md shadow-md relative">
          {/* Test Name */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {selectedTopic} Test
          </h2>

          {/* Timer SVG */}
          <div className="flex justify-center mb-6">
            <TimerSVG timeLeft={timeLeft} />
          </div>

          {/* Score */}
          <div className="flex justify-center mb-6">
            <div className="text-xl font-medium text-blue-500">
              Score: {score}/{questionsData[selectedTopic].length}
            </div>
          </div>

          {/* Question Number */}
          <div className="absolute top-4 right-4 text-gray-600 text-sm font-medium">
            {currentQuestionIndex + 1}/{questionsData[selectedTopic].length}
          </div>

          {/* Question Text */}
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = answerStatus === "correct";
              const isCurrentCorrect = isSelected && isCorrect;
              const isCurrentIncorrect = isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  className={`py-2 px-4 rounded-lg transition-all
                    ${isCurrentCorrect ? "bg-green-500 text-white" : ""}
                    ${isCurrentIncorrect ? "bg-red-500 text-white" : ""}
                    ${!isSelected ? "bg-orange-400 hover:bg-orange-600 text-white" : ""}
                  `}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Exit Button */}
          <button
            className="absolute top-4 left-4 text-xl font-semibold text-blue-500"
            onClick={handleExit} // Updated exit button logic
          >
            &lt; Exit
          </button>

          {/* Completion Message */}
          {testCompleted && (
            <div className="mt-6 text-center text-lg font-medium text-green-600">
              Test Completed! Your Score: {score}/{questionsData[selectedTopic].length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
