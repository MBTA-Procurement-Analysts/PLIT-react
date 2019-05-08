import React from "react";

import fns from "date-fns"; //lodash for dates

class EarlyWarningTable extends React.Component {
  formatDate = string => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };
  durationCalculation = reqApprv => {
    //subtract today - req approval date
    const today = new Date();
    let result = fns.differenceInDays(today, reqApprv);

    return result;
  };

  renderEarlyWarningTable() {
    return (
      <div style={{ overflow: "auto" }}>
        <table className="ui single line table">
          <thead>
            <tr>
              <th>WO_No</th>
              <th>Req_ID</th>
              <th>Req_Created_Date</th>
              <th>Req_Approval_Date</th>
              <th>PO_No</th>
              <th>PO_Created_Date</th>
              <th>PO_Approval_Date</th>
              <th>Req_Descr</th>
              <th>Buyer_Line</th>
              <th>Unit</th>
              <th>Hold status</th>
              <th>Out-to-bid</th>
              <th>Status</th>
              <th>Buyer_Header</th>
              <th>Duration</th>
              <th> Executing Department</th>
              <th> Project_ID</th>
              <th> Project_Name</th>
              <th>Director</th>
              <th>Project_Manager</th>
            </tr>
          </thead>

          <tbody>
            {this.props.earlyWarningArray.map(po => {
              const matchingItem = this.props.forestArray.find(
                item => item.wo_nbr === po.WO_Num && (item.Executing_Department ==="Vehicle Maintenance" || item.Executing_Department === "Vehicle Engineering")

              );
              return (

                <tr key={po._id}>
                  {matchingItem && <td>{po.WO_Num}</td>}
                  {matchingItem && <td>{po.Req_ID}</td>}
                  {matchingItem && <td>{this.formatDate(po.Req_Created_Date)}</td>}
                  {matchingItem && <td>{this.formatDate(po.Req_Approval_Date)}</td>}
                  {matchingItem && <td>{po.PO_No}</td>}
                  {matchingItem && <td>{this.formatDate(po.PO_Date)}</td>}
                  {matchingItem && <td>{this.formatDate(po.Date_Approved)}</td>}
                  {matchingItem && <td>{po.Req_Descr}</td>}
                  {matchingItem && <td>{po.Buyer}</td>}
                  {matchingItem && <td>{po.Business_Unit}</td>}
                  {matchingItem && <td>{po.HOLD_STATUS}</td>}
                  {matchingItem && <td>{po.Out_to_bid}</td>}
                  {matchingItem && <td>{po.Req_Status}</td>}
                  {matchingItem && <td>{po.Req_Dflt_Tble_Buyer}</td>}
                  {matchingItem && <td>{this.durationCalculation(po.Req_Approval_Date)}</td>}

                  {matchingItem && <td>{matchingItem.Executing_Department}</td>}
                  {matchingItem && <td>{matchingItem.Project_ID}</td>}
                  {matchingItem && <td>{matchingItem.Project_Name}</td>}
                  {matchingItem && <td>{matchingItem.Director}</td>}
                  {matchingItem && <td>{matchingItem.Project_Manager}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return <div>{this.renderEarlyWarningTable()}</div>;
  }
}
export default EarlyWarningTable;