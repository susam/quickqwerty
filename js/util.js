/*
The MIT License (MIT)

Copyright (c) 2008-2019 Susam Pal

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Util = function() {

    'use strict'


    // Determine how many characters in the beginning of string a
    // are common with that of string b.
    //
    // Arguments:
    //   a -- A string
    //   b -- Another string
    //
    // Return:
    //   The number of common characters in the beginning of both
    //   strings
    function common(a, b)
    {
        var minLength = Math.min(a.length, b.length)
        for (var i = 0; i < minLength; i++) {
            if (a.charAt(i) != b.charAt(i)) {
                return i
            }
        }
        return i
    }


    // Return a random element from the specified a.
    //
    // Argument:
    //   a -- An array
    //
    // Return:
    //   An element selected randomly from the array a
    function random(a, b)
    {
        if (typeof a == 'number') {
            if (typeof b == 'number') {
                a = Math.floor(a)
                b = Math.floor(b)
                return Math.floor(Math.random() * (b - a + 1)) + a
            } else {
                return Number.NaN
            }
        } else if (a instanceof Array) {
            return a[Math.floor(Math.random() * a.length)]
        }
    }


    // Convert the specified duration specified as the number of
    // milliseconds into a string that specifies the duration in days,
    // hours, minutes and seconds.
    //
    // Argument:
    //   milliseconds -- Duration specified as number of milliseconds
    //                   (type: number)
    //
    // Return:
    //   Duration specified in days, hours, minutes and seconds
    //   (type: string)
    function prettyTime(milliseconds, showMilliseconds)
    {
        if (typeof showMilliseconds == 'undefined') {
            showMilliseconds = true
        }

        seconds = Math.floor(milliseconds / 1000)
        minutes = Math.floor(seconds / 60)
        hours = Math.floor(minutes / 60)
        days = Math.floor(hours / 24)


        milliseconds %= 1000
        seconds %= 60
        minutes %= 60
        hours %= 24

        seconds += (milliseconds / 1000)

        var s = ''

        if (days != 0) {
            s += days + ' day' + (days > 1 ? 's' : '') + ' '
        }

        if (hours != 0) {
            s += hours + ' hour' + (hours > 1 ? 's' : '') + ' '
        }

        if (minutes != 0) {
            s += minutes + ' minute' + (minutes > 1 ? 's' : '') + ' '
        }

        if (seconds != 0) {
            s += seconds.toFixed(showMilliseconds ? 3 : 0) +
                 ' second' + (seconds > 1 ? 's' : '') + ' '
        }

        if (s.length == 0) {
            return '0 second'
        } else {
            // Remove the trailing space and return the string
            return s.substring(0, s.length - 1)
        }
    }


    // Return a visual representation of the specified string.
    //
    // In the returned string, all occurrences of spaces are replaced
    // with no-break space, and all occurrences of newlines are replaced
    // with return symbol.
    //
    // Argument:
    //   s -- a string (type: string)
    //
    // Return:
    //  Visual representation of the string (type: string)
    function visual(s)
    {
        return s.replace(/ /g, '\u00a0').replace(/\n/g, '\u23ce')
    }


    // Add children to a DOM node.
    //
    // This function accepts a variable number of arguments. The first
    // argument must be a parent node to which the child nodes are to be
    // added. The first argument is followed by one or more arguments,
    // one argument each for every child node that must be added to the
    // parent node.
    //
    // If any child node argument is not found to be an instance of
    // Node, then a Text node is created from this argument after
    // converting it into a string.
    //
    // If this function is called with 0 or 1 arguments, then this
    // function does nothing.
    //
    // Arguments:
    //   node -- Parent node (type: Node)
    //   childNode, ... -- One or more child nodes (type: Node ...)
    function addChildren()
    {
        // If no children nodes are specified, then there is nothing to
        // do.
        if (arguments.length <= 1) {
            return
        }

        var node = arguments[0]
        var childNodes = Array.prototype.slice.call(arguments, 1)
        var childNode
        var i

        for (i = 0; i < childNodes.length; i++) {
            childNode = childNodes[i]

            if (childNode instanceof Node) {
                node.appendChild(childNode)
            } else {
                node.appendChild(document.createTextNode(childNode + ''))
            }
        }
    }


    // Remove all children of a DOM node.
    //
    // Argument:
    //   node -- Node in a DOM (type: Node)
    function removeChildren(node)
    {
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
    }


    // Set children of a DOM node.
    //
    // This function removes the existing children of a DOM node and
    // adds the specified child nodes.
    //
    // A call to the following function
    //
    //     setChildren(node, childNode1, childNode2)
    //
    // is equivalent to calls to the following two functions
    //
    //     removeChildren(node)
    //     addChildren(node, childNode1, childNode2)
    //
    // Arguments:
    //   node -- Parent node (type: Node)
    //   childNode, ... -- One or more child nodes (type: Node ...)
    function setChildren()
    {
        // If no children nodes are specified, then there is nothing to
        // do.
        if (arguments.length <= 1) {
            return
        }

        // Remove existing children and add new children
        removeChildren(arguments[0])
        addChildren.apply(null, arguments)
    }


    // Util object
    return {
        common: common,
        random: random,
        prettyTime: prettyTime,
        addChildren: addChildren,
        setChildren: setChildren,
        removeChildren: removeChildren,
        visual: visual
    }
}()
