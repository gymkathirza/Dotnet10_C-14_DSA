using DSA;

// Array and list in C# 10 with collection expression and array indexing.
int[] arr = [0,1,2,3,4,5,6,7,8,9];    
List<int> list = [..arr, 10,11,12,13,14,15];
arr[3] = 15;
Console.WriteLine($"Array elements: {string.Join(", ", arr)}");
Console.WriteLine($"List elements: {string.Join(", ", list)}");

Console.WriteLine($"--- Random algo 1 (50%) & 0 (50%) ---");
Random_algo.Run(Random_algo.RAND_ALGO_TYPE.Rand50);

Console.WriteLine($"--- Random algo 1 (75%) & 0 (25%) ---");
Random_algo.Run(Random_algo.RAND_ALGO_TYPE.Rand_1_75_Rand_0_25);

Console.WriteLine($"--- Random algo 1 (25%) & 0 (75%) ---");
Random_algo.Run(Random_algo.RAND_ALGO_TYPE.Rand_1_25_Rand_0_75);