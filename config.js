// Replace the following with values for your environment.
username = 'dbSafty';
password = 'atZf9dgE6aBX3uxu';
clusterUrl = 'cluster0.t42yh.mongodb.net/saftyRep_db?retryWrites=true&w=majority';
authMechanism = 'DEFAULT';

//URI is as following
const uri =  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

module.exports = uri