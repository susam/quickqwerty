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

    // Element to display the title of the current unit
    unitHeading: null,

    // Element to display tips for the current unit
    tipsTextDiv: null,

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
window.onhashchange = updateUnitFromURL


// Initialize the typing tutor
function init()
{
    tutor.unitLinksDiv = document.getElementById('unitLinks')
    tutor.subunitLinksDiv = document.getElementById('subunitLinks')
    tutor.unitHeading = document.getElementById('unitTitle')
    tutor.tipsTextDiv = document.getElementById('tipsText')
    tutor.targetTextDiv = document.getElementById('targetText')

    displayUnitLinks()
    updateUnitFromURL()
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


// Parse the current URL and determine the current unit and subunit
// numbers, and display the determined subunit.
//
// The fragment identifier in the URL may contain the current
// unit and subunit numbers in m.n format where m is the current unit
// number and n is the current subunit number.
//
// If the fragment identifier is absent, then the current unit is 1 and
// the current subunit is 1.
//
// If the fragment identifier is a single integer m only, then the
// current unit is m and the current subunit is 1.
//
// The following is a list of example URLs along with the unit number
// they translate to.
//
//   http://quickqwerty.com/      -- Unit 1.1
//   http://quickqwerty.com/#5    -- Unit 5.1
//   http://quickqwerty.com/#5.1  -- Unit 5.1
//   http://quickqwerty.com/#5.2  -- Unit 5.2
function updateUnitFromURL()
{
    // Default lesson is Unit 1.1
    var unit = 1
    var subunit = 1

    // Parse the fragment identifier in the URL and determine the unit
    if (window.location.hash.length > 0) {
        var fragmentID = window.location.hash.slice(1)
        var tokens = fragmentID.split('.')
        unit = parseInt(tokens[0])
        if (tokens.length > 1)
            subunit = parseInt(tokens[1])
    }

    setSubunit(unit, subunit)
    setTargetText(0)
    displaySubunitLinks()
    displayUnitTitle()
    displayTips()
    displayTargetText()
}


// Set the tutor properties for the specified unit and subunit numbers.
//
// Arguments:
//   m -- Unit number
//   n -- Subunit number
function setSubunit(m, n)
{
    tutor.unitNo = m
    tutor.subunitNo = n

    tutor.unit = units[m - 1]

    tutor.subunitTitles.length = 0
    for (var subunitTitle in tutor.unit.subunits) {
        tutor.subunitTitles.push(subunitTitle)
    }

    var subunitTitle = tutor.subunitTitles[n - 1]
    tutor.subunitText = tutor.unit.subunits[subunitTitle]
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
        anchor.href = '#' + tutor.unitNo + '.' + (i + 1)
        anchor.innerHTML = tutor.subunitTitles[i]

        subunitDiv.appendChild(anchor)
        linksDiv.insertBefore(subunitDiv, linksDiv.firstChild)
    }
}


// Display title for the current unit.
function displayUnitTitle() {
    // Create unit title nodes
    var unitNoText = document.createTextNode('Unit ' + tutor.unitNo +
                                             '.' + tutor.subunitNo)
    var whitespace = document.createTextNode('\u00a0\u00a0')
    var titleText = document.createTextNode('[' + tutor.unit.title + ']')

    // Remove current unit title
    while (tutor.unitHeading.firstChild) {
        tutor.unitHeading.removeChild(tutor.unitHeading.firstChild)
    }

    // Add current unit title
    tutor.unitHeading.appendChild(unitNoText)
    tutor.unitHeading.appendChild(whitespace)
    tutor.unitHeading.appendChild(titleText)
}


// Display tips for the current unit.
function displayTips() {
   tutor.tipsTextDiv.innerHTML = tutor.unit.tips
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

    // Remove current target text
    while (tutor.targetTextDiv.firstChild) {
        tutor.targetTextDiv.removeChild(tutor.targetTextDiv.firstChild)
    }

    // Add prefix, target character and suffix to the target text
    // element
    tutor.targetTextDiv.appendChild(prefixNode)
    tutor.targetTextDiv.appendChild(targetSpan)
    tutor.targetTextDiv.appendChild(suffixNode)
}
