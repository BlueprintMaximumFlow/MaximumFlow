#include<iostream>
using namespace std;

class data{
   public:
      int step[9999][9999],cap[9999][9999],rest[9999][9999];
      int num,active[9999999],label[9999999],inflow[9999999];
};

data info;

class operation{
   public:
      void height(void){
          int p1,p2,count,temp,layer;
           int conflict[info.num];
           for (int i=1;i<info.num;i++){
               conflict[i]=0;
           }
           count=0;
           p1=0;
           p2=0;
           layer=0;
           int q[999];
           q[0]=info.num;
           while (count<info.num-1){
                 layer=layer+1;
                 temp=0;
                 for (int i=p1;i<=p2;i++){
                     for (int j=1;j<info.num;j++){
                         if ((info.rest[j][q[i]]>0)&&(conflict[j]==0)){
                             count=count+1;
                             temp=temp+1;
                             q[p2+temp]=j;
                             info.label[j]=layer;
                             conflict[j]=1;
                         }
                     }
                 }
                 p1=p2+1;
                 p2=p2+temp;
           }
      } 
      void init(void){
           int i,j;
           for (i=1;i<=info.num;i++){
               if (info.cap[1][i]>0){
                   info.rest[i][1]=info.cap[1][i];
                   info.rest[1][i]=0;
                   info.inflow[i]=info.cap[1][i];
                   info.active[i]=1;
               }
           }
           info.label[1]=info.num;
      }

      bool judgerelabel(int act){
           int i;
           for (i=1;i<=info.num;i++){
               if (info.rest[act][i]>0){
                   return true;
                   break;
               }
           }
           return false;
      }

      void refresh(void){
           int i,j;
           for (i=1;i<=info.num;i++){
               if (info.inflow[i]>0){
                   info.active[i]=1;
               } else{
                      info.active[i]=0;
               }
           }
      }

      void refresh(int act){
           if (info.inflow[act]==0){
               info.active[act]=0;
           } else{
                  info.active[act]=1;
           }
      }

      void relabel(int act){
           info.label[act]+=1;
      }

       void push(int start,int end){
           int i,j,k;
           k=info.inflow[start];
           if (k>info.rest[start][end]){
               info.inflow[start]=k-info.rest[start][end];
               info.inflow[end]+=info.rest[start][end];
               info.rest[end][start]=info.cap[start][end];
               info.rest[start][end]=0;
               refresh(start);
               refresh(end);
           } else {
               info.inflow[start]=0;
               info.inflow[end]+=k;
               info.rest[end][start]+=k;
               info.rest[start][end]-=k;
               refresh(start);
               refresh(end);
           }     
       } 

      bool judge(void){
           int i;
           for (i=2;i<=info.num-1;i++){
               if (info.active[i]==1){
                   return true;
                   break;
               }
           }
           return false;
      }
};
int main(){
       int i,j;
       operation method;
       cout<<"Maximum Flow Problem Solver (Push-Relabel Algorithm)"<<endl<<endl; 
       cout<<"Please enter the number of the joints in the network."<<endl<<endl;
       cout<<"Input number: "; 
       cin>>info.num;
       cout<<endl<<"Please enter the adjacency matrix of the network."<<endl<<endl;
       cout<<"Input matrix:"<<endl<<endl;
       for (i=1;i<=info.num;i++){
           info.active[i]=0;
           info.inflow[i]=0;
           for (j=1;j<=info.num;j++){
               cin>>info.cap[i][j];
               info.rest[i][j]=info.cap[i][j];
           }
       }
       method.height();
       method.init();
       cout<<endl;
       while (method.judge()){
             for (i=2;i<=info.num-1;i++){
                 while (info.active[i]==1){
                     for (j=1;j<=info.num;j++){
                         if (info.label[i]==info.label[j]+1){
                             if (info.rest[i][j]>0){
                             method.push(i,j);
                             }
                         }
                     }
                     if ((info.inflow[i]>0)&&(method.judgerelabel(i))){
                         method.relabel(i);
                     }
                     method.refresh(i);
                 }
             }
             method.refresh();
       }
       cout<<"Output matrix of the maximum flow: "<<endl<<endl;
       for (i=1;i<=info.num;i++){
           for (j=1;j<=info.num;j++){
               if (info.cap[i][j]>0){
                   cout<<info.rest[j][i]<<" ";
               } else{
                      cout<<0<<" ";
                      }
           }
           cout<<endl; 
       }
       cout<<endl<<"The maximum flow in this network is "<<info.inflow[info.num]<<endl<<endl;
       system("pause");
       return 0;
} 
