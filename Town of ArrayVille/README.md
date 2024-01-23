# DappLooker-solutions
1.its a problem of prefix sum(kadane algorithm)
2.Iterate through the array and keep computing prefix sum
3.When prefix sum is not zero then keep adding element to the resultant array
4.when prefix sum becomes 0, then we need to discard all resultant array elements and look again from that index to the end.
5. At last our result array would contain at a subsequence with sum 0 if its present
