import isElement from 'iselement';
import arrayFrom from 'array-from';
import isArray from 'is-array';

function select(selector){
    if(typeof selector === 'string'){
        try{
            return document.querySelector(selector);
        }catch(e){
            throw e;
        }
    }else if(isElement(selector)){
        return selector;
    }
}

function selectAll(selector){
    if(typeof selector === 'string'){
        return Array.prototype.slice.apply(
            document.querySelectorAll(selector)
        );
    }else if(isArray(selector)){
        return selector.map(select);
    }else if('length' in selector){
        return arrayFrom(selector).map(select);
    }
}

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

export { indexOfElement, hasElement, domListOf, concatElementLists, addElements, removeElements, resolveElement, select, selectAll };
//# sourceMappingURL=bundle.es.js.map
