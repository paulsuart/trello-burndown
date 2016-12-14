require('es6-promise').polyfill();
var Client = require('node-rest-client').Client;

var options_proxy = {
    proxy: {
        host: "YOUR PROXY HOST",
        port: PORT,
        user: "YOUR PROXY USER",
        password: "YOUR PROXY PASSWORD",
        tunnel: true // use direct request to proxy 
    }
};
 
//var client = new Client(options_proxy);
var client = new Client(options_proxy);

var Trello = function (key, token) {
    this.uri = "https://api.trello.com";
    this.key = key;
    this.token = token;
};

Trello.prototype.createArgs = function () {
    return { path: {"key": this.key, "token": this.token} };
};

function makeRequest(fn, uri, args, callback) {
    console.log('requesting ' + uri + 'with args ' + JSON.stringify(args));     
    fn(uri, args, function(data, response) {
        console.log(data);
        callback(null, data);
    }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
    });
}

Trello.prototype.addBoard = function (name, description, organizationId, callback) {
    var args =this.createArgs();
    args.data = {name: name};

    if (description !== null)
        data.desc = description;
    if (organizationId !== null)
        data.idOrganization = organizationId;

    return makeRequest(client.post, this.uri + '/1/boards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.updateBoardPref = function (boardId, field, value, callback) {
    var args =this.createArgs();
    var data = {value: value};

    return makeRequest(client.put, this.uri + '/1/boards/' + boardId + '/prefs/' + field, args, callback);
};

Trello.prototype.addCard = function (name, description, listId, callback) {
    var args =this.createArgs();
    query.name = name;
    query.idList = listId;

    if (description !== null)
        query.desc = description;

    return makeRequest(client.post, this.uri + '/1/cards', args, callback);
};

Trello.prototype.getCard = function (boardId, cardId, callback) {
    var args = this.createArgs();
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/cards/?key=${key}&token=${token}' + cardId, args, callback);
};

Trello.prototype.getCardsForList = function(listId, actions, callback) {
    var args = this.createArgs();
    if (actions)
        args.path.actions = actions;

    return makeRequest(client.get, this.uri + '/1/lists/' + listId + '/cards/?key=${key}&token=${token}&actions=${actions}', args, callback);
};

Trello.prototype.renameList = function (listId, name, callback) {
    var args =this.createArgs();
    args.data ={name: name};

    return makeRequest(client.put, this.uri + '/1/lists/' + listId + '/name/?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addListToBoard = function (boardId, name, callback) {
    var args =this.createArgs();
    args.data = {name: name};

    return makeRequest(client.post, this.uri + '/1/boards/' + boardId + '/lists/?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addMemberToBoard = function (boardId, memberId, type, callback) {
    var args =this.createArgs();
    args.data = {type: type}; // Valid Values: 'normal','admin','observer'

    return makeRequest(client.put, this.uri + '/1/boards/' + boardId + '/members/' + memberId + "/?key=${key}&token=${token}", args, callback);
};

Trello.prototype.addCommentToCard = function (cardId, comment, callback) {
    var args =this.createArgs();
    args.data = {text: comment};

    return makeRequest(client.post, this.uri + '/1/cards/' + cardId + '/actions/comments?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addAttachmentToCard = function (cardId, url, callback) {
    var args =this.createArgs();
    args.data = {url: url};

    return makeRequest(client.post, this.uri + '/1/cards/' + cardId + '/attachments?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addMemberToCard = function (cardId, memberId, callback) {
    var args =this.createArgs();
    var data = {value: memberId};

    return makeRequest(client.post, this.uri + '/1/cards/' + cardId + '/members?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getBoards = function(memberId, callback) {    
    var args = this.createArgs();
    return makeRequest(client.get, this.uri + '/1/members/' + memberId + '/boards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getOrgBoards = function (organizationId, callback) {
    var args = this.createArgs();
    return makeRequest(client.get, this.uri + '/1/organizations/' + organizationId + '/boards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addChecklistToCard = function (cardId, name, callback) {
    var args = this.createArgs();
    query.name = name;

    return makeRequest(client.post, this.uri + '/1/cards/' + cardId + '/checklists', { query: query }, callback);
};

Trello.prototype.addExistingChecklistToCard = function (cardId, checklistId, callback) {
    var args =this.createArgs();
    query.idChecklistSource = checklistId;

    return makeRequest(client.post, this.uri + '/1/cards/' + cardId + '/checklists', { query: query }, callback);
};

Trello.prototype.getChecklistsOnCard = function (cardId, callback) {
    var args = this.createArgs();
    return makeRequest(client.get, this.uri + '/1/cards/' + cardId + '/checklists?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addItemToChecklist = function (checkListId, name, pos, callback) {
    var args =this.createArgs();
    query.name = name;
    query.pos = pos;

    return makeRequest(client.post, this.uri + '/1/checklists/' + checkListId + '/checkitems', {query: query}, callback);
};

Trello.prototype.updateCard = function (cardId, field, value, callback) {
    var args =this.createArgs();
    query.value = value;

    return makeRequest(client.put, this.uri + '/1/cards/' + cardId + '/' + field, {query: query}, callback);
};

Trello.prototype.updateChecklist = function (checklistId, field, value, callback) {
    var args =this.createArgs();
    query.value = value;

    return makeRequest(client.put, this.uri + '/1/checklists/' + checklistId + '/' + field, {query: query}, callback);
};

Trello.prototype.updateCardName = function (cardId, name, callback) {
    return this.updateCard(cardId, 'name', name, callback);
};

Trello.prototype.updateCardDescription = function (cardId, description, callback) {
    return this.updateCard(cardId, 'desc', description, callback);
};

Trello.prototype.updateCardList = function (cardId, listId, callback) {
    return this.updateCard(cardId, 'idList', listId, callback);
};

Trello.prototype.getMember = function(memberId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/member/?key=${key}&token=${token}' + memberId, args, callback);
};

Trello.prototype.getMemberCards = function (memberId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/members/' + memberId + '/cards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getBoardMembers = function (boardId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/members?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getOrgMembers = function (organizationId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/organizations/' + organizationId + '/members?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getListsOnBoard = function (boardId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/lists?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getListsOnBoardByFilter = function(boardId, filter, callback) {
    var args = this.createArgs();
    args.path.filter = filter;
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/lists?key=${key}&token=${token}&filter=${filter}', args, callback);
};

Trello.prototype.getCardsOnBoard = function (boardId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/cards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.getCardsOnList = function (listId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/lists/' + listId + '/cards?key=${key}&token=${token}', args, callback);
};

Trello.prototype.deleteCard = function (cardId, callback) {
    return makeRequest(client.del, this.uri + '/1/cards/' + cardId, {query: this.createArgs()}, callback);
};

Trello.prototype.addWebhook = function (description, callbackUrl, idModel, callback) {
    var args =this.createArgs();
    var data = {};

    data.description = description;
    data.callbackURL = callbackUrl;
    data.idModel = idModel;

    return makeRequest(client.post, this.uri + '/1/tokens/' + this.token + '/webhooks/', { data: data, query: query }, callback);
};

Trello.prototype.deleteWebhook = function (webHookId, callback) {
    var args =this.createArgs();

    return makeRequest(client.del, this.uri + '/1/webhooks/' + webHookId, { query: query }, callback);
};

Trello.prototype.getLabelsForBoard = function(boardId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/boards/' + boardId + '/labels?key=${key}&token=${token}', args, callback);
};

Trello.prototype.addLabelOnBoard = function(boardId, name, color, callback) {
    var args =this.createArgs();
    var data = {
        idBoard: boardId,
        color: color,
        name: name
    };

    return makeRequest(client.post, this.uri + '/1/labels', {data: data, query:query}, callback);
};

Trello.prototype.deleteLabel = function(labelId, callback) {
    return makeRequest(client.del, this.uri + '/1/labels/' + labelId, {query: this.createArgs()}, callback);
};

Trello.prototype.addLabelToCard = function(cardId, labelId, callback) {
    var args =this.createArgs();
    var data = { value: labelId };
    return makeRequest(client.post, this.uri+'/1/cards/' + cardId + '/idLabels', {query:query, data:data}, callback);
};

Trello.prototype.deleteLabelFromCard = function(cardId, labelId, callback){
    return makeRequest(client.del, this.uri + '/1/cards/' + cardId + '/idLabels/'+labelId, {query: this.createArgs()}, callback);
};

Trello.prototype.updateLabel = function (labelId, field, value, callback) {
    var args =this.createArgs();
    query.value = value;

    return makeRequest(client.put, this.uri + '/1/labels/' + labelId + '/' + field, {query: query}, callback);
};

Trello.prototype.updateLabelName = function (labelId, name, callback) {
    return this.updateLabel(labelId, 'name', name, callback);
};

Trello.prototype.updateLabelColor = function (labelId, color, callback) {
    return this.upadateLabel(labelId, 'color', color, callback);
};

Trello.prototype.getCardStickers = function (cardId, callback) {
    var args =this.createArgs();
    return makeRequest(client.get, this.uri + '/1/cards/' + cardId + '/stickers?key=${key}&token=${token}',  args, callback);
};

Trello.prototype.addStickerToCard = function(cardId, image, left, top, zIndex, rotate, callback) {
    var args =this.createArgs();
    var data = {
      image: image,
      top: top,
      left: left,
      zIndex: zIndex,
      rotate: rotate,
    };
    return makeRequest(client.post, this.uri+'/1/cards/' + cardId + '/stickers', {query:query, data:data}, callback);
};

module.exports = Trello;