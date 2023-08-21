import React from "react"
import {Table} from "antd"
const {Column} = Table;

class Stable extends React.Component{
    constructor(data){
        super(data)
        this.state={           
              columns : data
        }
        console.log("columns start print");
        console.log(this.state.columns);
        console.log("columns end print");
        console.log("data start print");
        console.log(this.state.columns.data);
    }
    render(){
      return (
        <div>
          <h4>Information of Students</h4>
          <Table dataSource ={this.state.columns.data} pagination={{pageSize:10}} className="stable"> 
          <Column title ='id' dataIndex='backupNo' render ={(text,recorder,index) => <span>{index +1}</span>}/>    
          <Column title ='netid' dataIndex='netid' />
          <Column title ='Name' dataIndex='name' />
          <Column title ='Email' dataIndex='email' />
          <Column title ='Gmail' dataIndex='gmail' />
          <Column title ='IsDuke' dataIndex='is_duke' />
          <Column title ='uniqueID' dataIndex='unique_id' />
          <Column title ='Comments' dataIndex='comments' />
          </Table> 
        </div> 
      )
    }
}
export default Stable