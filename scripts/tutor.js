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


// Global object with tutor settings
var settings = {
    TARGET_TEXT_LENGTH: 25
}


// Global object with tutor properties shared across all functions
var tutor = {
    // Element to display all unit numbers
    unitLinksDiv: null,

    // Element to display all subunit titles
    subunitLinksDiv: null,

    // Element to display the target text to be typed by the user
    targetTextDiv: null,

    // Current unit number
    unitNo: 0,

    // Current subunit number
    subunitNo: 0,

    // Current unit object
    unit: null,

    // Names of the subunits of the current unit
    subunitTitles: [],

    // Subunit text for the current subunit
    subunitText: '',

    // Part of the subunit text visible in the target text just before
    // the target character
    targetPrefix: '',

    // Character in the target text to be typed immediately by the
    // user
    targetChar: '',

    // Part of the subunit text visible in the target text just after
    // the target character
    targetSuffix: '',
}


window.onload = init


// Initialize the typing tutor
function init()
{
    tutor.unitLinksDiv = document.getElementById('unitLinks')
    tutor.subunitLinksDiv = document.getElementById('subunitLinks')
    tutor.targetTextDiv = document.getElementById('targetText')

    setSubunit(1, 1)
    setTargetText(0)
    displayUnitLinks()
    displaySubunitLinks()
    displayTargetText()
}


// Display the unit links
function displayUnitLinks()
{
    for (var i = 0; i < units.length; i++) {
        var divElement = document.createElement('div')
        divElement.className = 'unselected'
        divElement.id = 'unit' + (i + 1)

        var anchorElement = document.createElement('a')
        anchorElement.href = "#" + (i + 1)
        anchorElement.innerHTML = 'Unit ' + (i + 1)

        divElement.appendChild(anchorElement)
        tutor.unitLinksDiv.appendChild(divElement)
    }
}


// Set the tutor properties for the specified unit and subunit numbers.
//
// Arguments:
//   m -- Unit number
//   n -- Subunit number
function setSubunit(m, n)
{
    if (tutor.unitNo != m) {
        tutor.unitNo = m
        tutor.unit = units[m - 1]

        for (var subunitTitle in tutor.unit.subunits) {
            tutor.subunitTitles.push(subunitTitle)
        }
    }

    if (tutor.subunitNo != n) {
        tutor.subunitNo = n

        var subunitTitle = tutor.subunitTitles[n - 1]
        tutor.subunitText = tutor.unit.subunits[subunitTitle]
    }
}


// Display the subunit links for the current unit.
function displaySubunitLinks()
{
    // Delete all existing subunit links
    var linksDiv = tutor.subunitLinksDiv
    while (linksDiv.firstChild &&
           linksDiv.firstChild.className != 'stretch') {

        linksDiv.removeChild(linksDiv.firstChild)
    }

    // Create new subunit links for the unit m
    for (var i = tutor.subunitTitles.length - 1; i >= 0; i--) {
        // Insert whitespaces between div elements, otherwise they would
        // not be justified
        var whitespace = document.createTextNode('\n')
        linksDiv.insertBefore(whitespace, linksDiv.firstChild)

        var subunitDiv = document.createElement('div')
        subunitDiv.className = 'unselected'
        subunitDiv.id = 'subunit' + (i + 1)
        subunitDiv.style.width = (95 / tutor.subunitTitles.length) + '%'

        var anchor = document.createElement('a')
        anchor.href = '#' + tutor.subunitNo + '.' + (i + 1)
        anchor.innerHTML = tutor.subunitTitles[i]

        subunitDiv.appendChild(anchor)
        linksDiv.insertBefore(subunitDiv, linksDiv.firstChild)
    }
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
function setTargetText(index) {

    // Length of the target text should be odd as equal number of
    // characters should be displayed on either side of the character to
    // be typed
    var targetLength = settings.TARGET_TEXT_LENGTH
    if (targetLength % 2 == 0) {
        targetLength--
    }

    // Number of characters on either side of the character to be typed,
    // assuming that the character to be typed is at the centre
    var prefixLength = (targetLength - 1) / 2

    // Calculate the start index and the end index of the substring to
    // be selected from the subunit text to display as the target text
    if (index <= prefixLength) {
        var startIndex = 0
    } else if (index >= tutor.subunitText.length - 1 - prefixLength) {
        var startIndex = tutor.subunitText.length - targetLength
    } else {
        var startIndex = index - prefixLength
    }
    var endIndex = startIndex + targetLength
    
    // Select prefix string
    tutor.targetPrefix = tutor.subunitText.substring(startIndex, index)
    tutor.targetPrefix = tutor.targetPrefix.replace(/ /g, '\u00a0')

    // Select target character
    tutor.targetChar = tutor.subunitText.charAt(index)
    if (tutor.targetChar == ' ') {
        tutor.targetChar = '\u00a0'
    }

    // Select suffix string
    tutor.targetSuffix = tutor.subunitText.substring(index + 1, endIndex)
    tutor.targetSuffix = tutor.targetSuffix.replace(/ /g, '\u00a0')
}


// Display the current target text
function displayTargetText()
{
    // Create prefix and suffix nodes
    var prefixNode = document.createTextNode(tutor.targetPrefix)
    var suffixNode = document.createTextNode(tutor.targetSuffix)

    // Create target character element
    var targetSpan = document.createElement('span')
    var targetCharNode = document.createTextNode(tutor.targetChar)
    targetSpan.className = 'targetChar'
    targetSpan.appendChild(targetCharNode)

    // Add prefix, target character and suffix to the target text
    // element
    tutor.targetTextDiv.appendChild(prefixNode)
    tutor.targetTextDiv.appendChild(targetSpan)
    tutor.targetTextDiv.appendChild(suffixNode)
}
