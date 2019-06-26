function walk(rootNode) {
  // Find all the text nodes in rootNode
  var walker = document.createTreeWalker(
    rootNode,
    NodeFilter.SHOW_TEXT,
    null,
    false
  ),
    node;

  // Modify each text node's value
  while (node = walker.nextNode()) {
    handleText(node);
  }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v) {

  v = v.replace(/\bETC\b/g, "Shitcoin #16");
  v = v.replace(/\bEthereum Classic\b/g, "Shitcoin #16");
  v = v.replace(/\bethereum Classic\b/g, "Shitcoin #16");
  v = v.replace(/\bethereum classic\b/g, "Shitcoin #16");
  v = v.replace(/\bEthereum classic\b/g, "Shitcoin #16");
  v = v.replace(/\bETH\b/g, "Shitcoin #1");
  v = v.replace(/\bEthereum\b/g, "Shitcoin #1");
  v = v.replace(/\bethereum\b/g, "shitcoin #1");
  v = v.replace(/\bXRP\b/g, "Shitcoin #2");
  v = v.replace(/\bRipple\b/g, "Shitcoin #2");
  v = v.replace(/\bripple\b/g, "shitcoin #2");
  v = v.replace(/\bBCH\b/g, "Shitcoin #3");
  v = v.replace(/\bBitcoin Cash\b/g, "Shitcoin #3");
  v = v.replace(/\bBitcoin cash\b/g, "shitcoin #3");
  v = v.replace(/\bbitcoin cash\b/g, "shitcoin #3");
  v = v.replace(/\bbitcoin Cash\b/g, "shitcoin #3");
  v = v.replace(/\bLTC\b/g, "Shitcoin #4");
  v = v.replace(/\bLitecoin\b/g, "Shitcoin #4");
  v = v.replace(/\blitecoin\b/g, "shitcoin #4");
  v = v.replace(/\bEOS\b/g, "Shitcoin #5");
  v = v.replace(/\beos\b/g, "shitcoin #5");
  v = v.replace(/\bBNB\b/g, "shitcoin #6");
  v = v.replace(/\bBinance Coin\b/g, "Shitcoin #6");
  v = v.replace(/\bBinance coin\b/g, "shitcoin #6");
  v = v.replace(/\bbinance coin\b/g, "shitcoin #6");
  v = v.replace(/\bBSV\b/g, "Shitcoin #7");
  v = v.replace(/\bBitcoin SV\b/g, "Shitcoin #7");
  v = v.replace(/\bbitcoin SV\b/g, "Shitcoin #7");
  v = v.replace(/\bADA\b/g, "Shitcoin #8");
  v = v.replace(/\bCardano\b/g, "Shitcoin #8");
  v = v.replace(/\bcardano\b/g, "shitcoin #8");
  v = v.replace(/\bTRON\b/g, "Shitcoin #9");
  v = v.replace(/\bTRX\b/g, "Shitcoin #9");
  v = v.replace(/\bXLM\b/g, "Shitcoin #10");
  v = v.replace(/\bStellar\b/g, "shitcoin #10");
  v = v.replace(/\bXMR\b/g, "Shitcoin #11");
  v = v.replace(/\bMonero\b/g, "shitcoin #11");
  v = v.replace(/\bmonero\b/g, "shitcoin #11");
  v = v.replace(/\bDASH\b/g, "Shitcoin #12");
  v = v.replace(/\bDash\b/g, "Shitcoin #12");
  v = v.replace(/\bNEO\b/g, "Shitcoin #13");
  v = v.replace(/\bNeo\b/g, "shitcoin #13");
  v = v.replace(/\bIOTA\b/g, "Shitcoin #14");
  v = v.replace(/\bMIOTA\b/g, "shitcoin #14");
  v = v.replace(/\bCosmos\b/g, "Shitcoin #15");
  v = v.replace(/\bATOM\b/g, "shitcoin #15");
  v = v.replace(/\bNEM\b/g, "Shitcoin #17");
  v = v.replace(/\bXEM\b/g, "Shitcoin #17");
  v = v.replace(/\bONT\b/g, "Shitcoin #18");
  v = v.replace(/\bOntology\b/g, "Shitcoin #18");
  v = v.replace(/\bZEC\b/g, "Shitcoin #19");
  v = v.replace(/\bZcash\b/g, "Shitcoin #19");
  v = v.replace(/\bZCASH\b/g, "Shitcoin #19");
  v = v.replace(/\bXTZ\b/g, "Shitcoin #20");
  v = v.replace(/\bTezos\b/g, "Shitcoin #20");
  v = v.replace(/\bTezos\b/g, "Shitcoin #20");
  v = v.replace(/\bLibra\b/g, "ZuckBucks");
  return v;
}

// Returns true if a node should *not* be altered in any way
function isForbiddenNode(node) {
  return node.isContentEditable || // DraftJS and many others
    (node.parentNode && node.parentNode.isContentEditable) || // Special case for Gmail
    (node.tagName && (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
      node.tagName.toLowerCase() == "input"));
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
  var i, node;

  mutations.forEach(function (mutation) {
    for (i = 0; i < mutation.addedNodes.length; i++) {
      node = mutation.addedNodes[i];
      if (isForbiddenNode(node)) {
        // Should never operate on user-editable content
        continue;
      } else if (node.nodeType === 3) {
        // Replace the text for text nodes
        handleText(node);
      } else {
        // Otherwise, find text nodes within the given node and replace text
        walk(node);
      }
    }
  });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
  var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
      characterData: true,
      childList: true,
      subtree: true
    },
    bodyObserver, titleObserver;

  // Do the initial text replacements in the document body and title
  walk(doc.body);
  doc.title = replaceText(doc.title);

  // Observe the body so that we replace text in any added/modified nodes
  bodyObserver = new MutationObserver(observerCallback);
  bodyObserver.observe(doc.body, observerConfig);

  // Observe the title so we can handle any modifications there
  if (docTitle) {
    titleObserver = new MutationObserver(observerCallback);
    titleObserver.observe(docTitle, observerConfig);
  }
}
walkAndObserve(document);

walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
  if (node.nodeName.toLowerCase() == 'input' || node.nodeName.toLowerCase() == 'textarea' || (node.classList && node.classList.contains('ace_editor'))) { return; }

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}


