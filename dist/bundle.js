'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isElement = _interopDefault(require('iselement'));
var arrayFrom = _interopDefault(require('array-from'));
var isArray = _interopDefault(require('is-array'));

function indexOfElement(elements, element){
    element = resolveElement(element, true);
    if(!isElement(element)) { return -1; }
    for(var i=0; i<elements.length; i++){
        if(elements[i] === element){
            return i;
        }
    }
    return -1;
}

function hasElement(elements, element){
    return -1 !== indexOfElement(elements, element);
}

function domListOf(arr){

    if(!arr) { return []; }

    try{
        if(typeof arr === 'string'){
            return arrayFrom(document.querySelectorAll(arr));
        }else if(isArray(arr)){
            return arr.map(resolveElement);
        }else{
            if(typeof arr.length === 'undefined'){
                return [resolveElement(arr)];
            }

            return arrayFrom(arr, resolveElement);

        }
    }catch(e){
        throw new Error(e);
    }

}

function concatElementLists(){
    var lists = [], len = arguments.length;
    while ( len-- ) lists[ len ] = arguments[ len ];

    return lists.reduce(function (last, list){
        return list.length ? last : last.concat(domListOf(list));
    }, []);
}

function pushElements(elements, toAdd){
    
    for(var i=0; i<toAdd.length; i++){
        if(!hasElement(elements, toAdd[i]))
            { elements.push(toAdd[i]); }
    }

    return toAdd;
}

function addElements(elements){
    var toAdd = [], len = arguments.length - 1;
    while ( len-- > 0 ) toAdd[ len ] = arguments[ len + 1 ];

    toAdd = toAdd.map(resolveElement);
    return pushElements(elements, toAdd);
}

function removeElements(elements){
    var toRemove = [], len = arguments.length - 1;
    while ( len-- > 0 ) toRemove[ len ] = arguments[ len + 1 ];

    return toRemove.map(resolveElement).reduce(function (last, e){

        var index = indexOfElement(elements, e);

        if(index !== -1)
            { return last.concat(elements.splice(index, 1)); }
        return last;
    }, []);
}

function resolveElement(element, noThrow){
    if(typeof element === 'string'){
        try{
            return document.querySelector(element);
        }catch(e){
            throw e;
        }

    }

    if(!isElement(element) && !noThrow){
        throw new TypeError((element + " is not a DOM element."));
    }
    return element;
}

exports.indexOfElement = indexOfElement;
exports.hasElement = hasElement;
exports.domListOf = domListOf;
exports.concatElementLists = concatElementLists;
exports.addElements = addElements;
exports.removeElements = removeElements;
exports.resolveElement = resolveElement;
//# sourceMappingURL=bundle.js.map
