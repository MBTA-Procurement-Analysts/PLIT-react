---
output:
  word_document: default
  pdf_document: default
  html_document: default
---

# PLIT 2.0 manual

## Purpose

Plit is a project that contains several tools for the procurement and logistics department at the MBTA. The original PLIT was written in angular and used a MEAN stack. Plit 2.0 is the transition from angular to react.

This project is closely connect to other projects such as the pipe also known as Project-Ducktape which is how we get the data from fmis into our database.

This project mainly resides on Github because it has not been deployed to AWS.

## Project Strucuture

### client

This is where the frontend Lives and src entirely in React with Redux.

Redux is also used.

authentication is used for determining if a user is allowed to view a page or not. If a route requires identifcation to be visited a component (the parent component) is passed to the Private route component in the App.js file.

The BidNumber is ready for deployment but the backend is set up so that if you add a new bid number the count for the current year will begin. That means that if it is tested before deployment to ensure that it is working properly the count will have to be adjusted and reset so that the next time a bid number is added it will start counting from one.

EarlyWarning is a report that was originally generated manually using excel and access. This report is just a view generated in a similar manner using an uploaded document that used to be done by someone name forest so this information is often referred to as forest's. The file needs to be uploaded as CSV. There is also an issue with csv/excel. When it is saved any number that starts with 0 has its zeroes removes. Excel believes they are not neccessary. This is mainly an issue with Work order numbers. The solution to this is to tell excel that the work order column contains strings not numbers and then excel will not change the data. The feature supports either a number work order or a string work order. Uploading the excel file as is will still work but for example a Work order number of 0812 will show up as 812 in the report. This is likely to cause confusion as that is not the correct work order number.

Franks Emails: This project was brought to a halt because scott wanted vendor emails to be on FMIS so that all of our data could have just one source. There are scripts on silverback that make the data pull for the items that we want to email for to follow up on. Only vendor ID is pulled. Also nodemailer was being used to send emails and they are blocked on the local network but this should not be an issue when sending emails after deployment on AWS. 

[<https://provider.www.upenn.edu/computing/da/bo/webi/qna/iv_csvLeadingZeros.html]>

### `Server/`

This is the backend it is almost entirely identicle to angulars backend aside from some additions for newer features. Features that are not being used may be supported in the backend. If it exists on PLIT the backend should be the same.

### `Public/`

This is what is used for the view on PLIT most of the view has been removed since angular is not used in this project. But the backend makes use of trello cards for the trello(rubikdata3.com/trello) feature on old PLIT which was created to help ray manage work loads.

## Data origins and dependance on Ducttape

Aside from the upload the other data resides in FMIS. The early warning query is called using selenium and downloaded and then inserted into the database via python scripts. All the files needed for this data pull are referenced in the tape-early-warning.sh shell file within the ducttape folder on silverback.

## Deployment

There are some concerns and problems that are likely to arise upon deployment. The first one being that you may want a new amazon instance.

Nodemon if you're not familiar automatically restarts the server when changes in the backend are detected. When in development on a local machine the server should be started with "nmp run nodemon" and this concurrently runs the react and express portions of the project. When deployed the server should not be started this way because there is a part of the backend that is responsible for the trello view mentiond in the Public portion of the documentation in line 40. This portion of the backend is able to rewrite a specific part of the backend that can be found in the left over public folder from angular. Nodemon detects these changes and restarts. This is not an issue in development but upon deployment would be inconvenient to users and could cause errors.

Data Origins: For development silverback was tunneled into and the data pull scripts were created. Running the early warning shell file with the options both and local ex: sh tape-early-warning.sh both local will update both the dev and prod databases and local will keep the update to silverback. This is important becuase the scripts DO NOT EXIST on ohio and the data pull is not yet automatically done by cron. This is because this project was not deployed to AWS server yet. When this happens all of the data fetching scripts should be brought over as well. Pleas see the Pipe.md documentation on pipeline before doing this to fully understand the structure of the project.

## Contact

This Project is mainly built by the co-op team of Spring 2019. Reach out to christophernm@gmail.com if you have any questions.