/*
SIMPLIFIED BSD LICENSE

Copyright (c) 2013 Susam Pal
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above
       copyright notice, this list of conditions and the following
       disclaimer in the documentation and/or other materials provided
       with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var unitLinksDiv    // To display all unit numbers
var subunitLinksDiv // To display all subunits in a unit
var targetTextDiv   // To display the target text to be typed

var subunitText     // Text to be typed by the user


window.onload = init


// Initialize the typing tutor
function init()
{
    unitLinksDiv = document.getElementById('unitLinks')
    subunitLinksDiv = document.getElementById('subunitLinks')
    targetTextDiv = document.getElementById('targetText')
    initUnitLinks()
    initSubunitLinks(1)
    setSubunit(1, 1)
}


// Initialize the unit links
function initUnitLinks()
{
    for (var i = 0; i < units.length; i++) {
        var divElement = document.createElement('div')
        divElement.className = 'unselected'
        divElement.id = 'unit' + (i + 1)

        var anchorElement = document.createElement('a')
        anchorElement.href = "#" + (i + 1)
        anchorElement.innerHTML = 'Unit ' + (i + 1)

        divElement.appendChild(anchorElement)
        unitLinksDiv.appendChild(divElement)
    }
}


// Initialize the subunit links
//
// Arguments:
//   m -- Unit number
function initSubunitLinks(m)
{
    // Get the subunit names
    var subunit = units[m - 1].subunits
    var subunitNames = []
    for (name in subunit) {
        subunitNames.push(name)
    }

    // Delete all existing subunit links
    while (subunitLinksDiv.firstChild &&
           subunitLinksDiv.firstChild.className != 'stretch') {
        subunitLinksDiv.removeChild(subunitLinksDiv.firstChild)
    }

    // Create new subunit links for the unit m
    for (var i = subunitNames.length - 1; i >= 0; i--) {
        // Insert whitespaces between div elements, otherwise they would
        // not be justified
        var whitespace = document.createTextNode('\n')
        subunitLinksDiv.insertBefore(whitespace, subunitLinksDiv.firstChild)

        var div = document.createElement('div')
        div.className = 'unselected'
        div.id = 'subunit' + (i + 1)
        div.style.width = (95 / subunitNames.length) + '%'

        var anchor = document.createElement('a')
        anchor.href = '#' + m + '.' + (i + 1)
        anchor.innerHTML = subunitNames[i]

        div.appendChild(anchor)
        subunitLinksDiv.insertBefore(div, subunitLinksDiv.firstChild)
    }
}


// Set the specified subunit.
//
// Arguments:
//   m -- Unit number
//   n -- Subunit number
function setSubunit(m, n) {
    // Get the subunit names
    var subunit = units[m - 1].subunits
    var subunitNames = []
    for (name in subunit) {
        subunitNames.push(name)
    }

    subunitText = units[m - 1].subunits[subunitNames[n - 1]]
    setTargetText(0, 25)
}


// Set the target text to be typed.
//
// The target text consits of three parts:
//   1. Prefix
//   2. Target character
//   3. Suffix
//
// The target character is the character the user should type to move
// ahead in the subunit. The prefix and the suffix offer some context
// around the target character to be typed. These three parts combined,
// in the specified order above, is a substring from the subunit's text
// from units.js.
//
// Arguments:
//   index -- Index of the target character
//   length -- Length of the target text
function setTargetText(index, length) {
    // Length of the target text should be odd as equal number of
    // characters should be displayed on either side of the character to
    // be typed
    if (length % 2 == 0) {
        length--
    }

    // Number of characters on either side of the character to be typed,
    // assuming that the character to be typed is at the centre
    var halfTextLength = (length - 1) / 2

    // Calculate the start index and the end index of the substring to
    // be selected from the subunit text to display as the target text
    if (index <= halfTextLength) {
        var startIndex = 0
    } else if (index >= subunitText.length - 1 - halfTextLength) {
        var startIndex = subunitText.length - length
    } else {
        var startIndex = index - halfTextLength
    }
    var endIndex = startIndex + length
    
    // Select prefix string
    var prefix = subunitText.substring(startIndex, index)
    prefix = prefix.replace(/ /g, '\u00a0')

    // Select target character
    var targetChar = subunitText.charAt(index)
    if (targetChar == ' ')
        targetChar = '\u00a0'

    // Select suffix string
    var suffix = subunitText.substring(index + 1, endIndex)
    suffix = suffix.replace(/ /g, '\u00a0')

    // Create prefix and suffix nodes
    var prefixNode = document.createTextNode(prefix)
    var suffixNode = document.createTextNode(suffix)

    // Create target character element
    var targetSpan = document.createElement('span')
    targetSpan.className = 'targetChar'
    var targetCharNode = document.createTextNode(targetChar)
    targetSpan.appendChild(targetCharNode)

    // Add prefix, target character and suffix to the target text
    // element
    targetTextDiv.appendChild(prefixNode)
    targetTextDiv.appendChild(targetSpan)
    targetTextDiv.appendChild(suffixNode)
}
