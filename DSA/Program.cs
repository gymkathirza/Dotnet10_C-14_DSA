using DSA;
// See https://aka.ms/new-console-template for more information

int[] arr = [0,1,2,3,4,5,6,7,8,9];    
int[] list = [..arr, 10,11,12,13,14,15];
arr[3] = 15;
Console.WriteLine($"Array elements: {string.Join(", ", arr)}");
Console.WriteLine($"List elements: {string.Join(", ", list)}");

Random_algo.GFG.Main(args);
