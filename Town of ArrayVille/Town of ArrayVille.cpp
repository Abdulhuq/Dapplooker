#include<bits/stdc++.h>
using namespace std;

void solve(vector<int>&arr,vector<int>&res){
    int presum=0;
    for(int i=0;i<arr.size();i++){
        presum+=arr[i];
        if(presum!=0){
            res.push_back(arr[i]);
        }
        else{
            res.clear();
        }

    }

}

int main(){
    vector<int>arr={1,2,-3,3,1};
    vector<int>res;
    solve(arr,res);
    for(int i=0;i<res.size();i++){
        cout<<res[i]<<" ";
    }
return 0;
}