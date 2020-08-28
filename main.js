document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {

  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';


  if (description == "" || severity == "" || assignedTo=="" ) {
    alert("Please Enter a issue first!");
    return;
  }

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  
  localStorage.setItem('issues', JSON.stringify(issues)); 
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  
  const currentIssue = issues.find(issue => issue.id == id);
  const indexOfCurrentIssue = issues.indexOf(currentIssue);
  issues.splice(indexOfCurrentIssue, 1);

  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6 ">Issue ID: ${id} </h6>
                              <p><span id="status" class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a  href="javascript:void();" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="javascript:void();" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
                              
  }

  document.getElementById("total-issue-count").innerText = issues.length;

  const openIssue = issues.filter(issue => issue.status == 'Open');
  document.getElementById("open-issue-count").innerText =  openIssue.length;  
}
