#include <bits/stdc++.h>
using namespace std;

int main(){
    vector<int> x = {1, 2, 5, 3, 4};
    vector<int> y = {10, 20, 5, 30, 40};
    if (find(y.begin(), y.end(), *max_element(x.begin(), x.end()))!= y.end()) {
        cout << "Treasure found!" << std::endl;
    } else {
        cout << "No treasure found." << std::endl;
    }
return 0;
}