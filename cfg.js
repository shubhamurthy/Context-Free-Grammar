var prep = ['under','over','behind','above','below','on'] //prepositions
var detsg = ['the', 'a'] //determiners for singular nouns
var verbtr=['eats','watches','sees','throws','catches','hides','hits','hugs','finds'] //transitive verbs
var verbint=['eats','sleeps','lies','rolls','jumps','crawls','draws','stands','runs','goes'] //intransitive verbs
var noun=['cat','dog','child','girl','boy','man','woman','person','snake','apple','pizza','bed','sofa','shirt','ball','door','jacket','bread','mouse','bottle','plate'] //nouns
var adj=['good','little','great','new','big','nice','old','fine','bad','wrong','dead','real','happy','beautiful','young','cool','important','funny','different','red','green','blue','cold','warm'] //adjectives

var np1=[detsg,noun] //1st noun phrase structure
var np2=[detsg, adj, noun] //2nd noun phrase structure
var np=[np1,np2] //noun phrase options
var pp1=[prep,np] //prepositional phrase structure
var pp=[pp1,''] //prepositional phrase options
var vtp=[verbtr,np] //1st verb phrase structure (transitive)
var vip=[verbint] //1st verb phrase structure (intransitive)
var vp=[vtp,vip,'is being'+adj] //verb phrase options
var s=[np,vp,pp] //sentence structure

//get a random number between 0 and a length - 1
function r(item){
  var rand=Math.floor(Math.random()*item.length);
  return rand;
}

//generate a noun phrase that does not contain a prepositional phrase
function nbar(){
  var nresponse=[];
  var array=np[r(np)]
  for(var i=0;i<array.length;i++){
    nresponse.push(array[i][r(array[i])])
  }
  return nresponse;
}

//generate a prepositional phrase
function prepphrase(){
  var presponse=[];
  var array=pp[r(pp)]
  if (array==pp1){
    presponse.push(array[0][r(array[0])])
    presponse.push(nbar())
  }
  else{presponse.push('')}
  return presponse;
}

//generate a noun phrase that contains a prepositional phrase
function nounphrase(){
  var i=0;
  var npresponse=[]
  npresponse.push(nbar())
  do{
    var pphrase=prepphrase();
    if(pphrase[1]==undefined){
      i=1
    }
    else{
      npresponse.push(pphrase)
    }
  }
  while(i<1);
  return npresponse;
}

//generate a verb phrase
function verbphrase(){
  var vresponse=[];
  nounphrase()
  var array=vp[r(vp)]
  if(array[0]=='i'){
    vresponse.push('is being',adj[r(adj)])
  }
  else{
    vresponse.push(array[0][r(array[0])])
    if (array==vtp){
      vresponse.push(nounphrase())
    }
  }
  return vresponse;
}

//generate final sentence
function finalsentence(){
  var response=[];
  response.push(nounphrase(),verbphrase());
  var i=0;
  do{
    var pphrase=prepphrase();
    if(pphrase[1]==undefined){
      i=1
    }
    else{
      response.push(pphrase)
    }
  }
  while(i<1);
  var response2 = response.toString();
  var response3 = response2.split(',')
  for (i=0;i<response3.length;i++){
    if(response3[i-1]=='a' && /[aeiou]/.test(response3[i][0])){
      response3[i-1]='an';
    }
  }
  return response3.join(' ');
}
