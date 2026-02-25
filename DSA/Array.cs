/*

You are given an integer array arr. Sort the integers in the array in ascending order by the number of 1's in their binary representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order.

Return the array after sorting it.

 

Example 1:

Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]
Example 2:

Input: arr = [1024,512,256,128,64,32,16,8,4,2,1]
Output: [1,2,4,8,16,32,64,128,256,512,1024]
Explantion: All integers have 1 bit in the binary representation, you should just sort them in ascending order.
 

Constraints:

1 <= arr.length <= 500
0 <= arr[i] <= 104

*/


using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;

public class Solution {
	
	public static void Main(string[] args)
	{
		var arr = new int[] {0,1,2,3,4,5,6,7,8};
		SortByBits(arr);
	}
    public static int[] SortByBits(int[] arr)
    {
      
      var sort = new SortedDictionary<int, SortedList<int, int>>();
      //Extract and Transform
      foreach(var item in arr)
      {
          var count = BinaryOneCount(item);
          if(sort.ContainsKey(count))
          {
            sort[count].Add(item, 0);
          }
          else
          {
            var newObj = new SortedList <int, int>();
            newObj.Add(item, 0);
            sort[count] = newObj;
          }
      }
  		
  		var result = new int[0];
  		
  		foreach(var kv in sort)
  		{
        result = [..result, ..kv.Value.Select(kv => kv.Key).ToArray()];
  		}
		
      return result;
    }

    private static int BinaryOneCount(int number)
    {
        var count = 0;
        var quo = 0;
        do{
            quo = number / 2;
            var remainder = number % 2;
      			if(remainder == 1)
      			{
      				count++;
      			}
      			number = quo;
        }while(quo != 0);
      
      return count;
    }
}
