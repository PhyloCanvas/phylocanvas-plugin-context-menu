import { Tooltip } from 'PhyloCanvas';
import { events, canvas } from 'phylocanvas-utils';

const { createHandler, preventDefault } = events;
const { translateClick } = canvas;

function createAnchorElement(contextMenu, { text = 'link', filename = 'file', href }) {
  const anchorElement = document.createElement('a');
  anchorElement.appendChild(document.createTextNode(text));
  anchorElement.href = href;
  anchorElement.download = filename;
  return anchorElement;
}

function createImageLink(contextMenu) {
  return createAnchorElement(contextMenu, {
    text: this.text,
    filename: 'phylocanvas_tree.png',
    href: contextMenu.tree.getPngUrl(),
  });
}

function createLeafIdsLink(contextMenu) {
  const leafdata = contextMenu.tree.root.downloadLeafIdsFromBranch();
  return createAnchorElement(contextMenu, {
    text: this.text,
    filename: 'pc-leaf-ids-root.txt',
    href: leafdata,
  });
}

function createBranchLeafIdsLink(contextMenu, node) {
  const leafdata = node.downloadLeafIdsFromBranch();
  return createAnchorElement(contextMenu, {
    text: this.text,
    filename: `pc-leaf-ids-${node.id}.txt`,
    href: leafdata,
  });
}

const DEFAULT_MENU_ITEMS = [

  [ { text: 'Collapse/Expand Branch',
    handler: function (branch) {
      branch.toggleCollapsed();
      branch.tree.draw(); // some browsers do not fire mousemove after clicking
    },
    node: true,
  }, {
    text: 'Rotate Branch',
    handler: 'rotate',
    node: true,
  }, {
    text: 'Show/Hide Labels',
    handler: 'toggleLabels',
  } ],

  [ {
    text: 'Redraw Subtree',
    handler: 'redrawTreeFromBranch',
    node: true,
  }, {
    text: 'Redraw Original Tree',
    handler: 'redrawOriginalTree',
  } ],

  [ {
    text: 'Export Leaf IDs on Branch',
    element: createBranchLeafIdsLink,
    node: true,
  }, {
    text: 'Export As Image',
    element: createImageLink,
  }, {
    text: 'Export Leaf IDs',
    element: createLeafIdsLink,
  } ],

];

function menuItemApplicable(menuItem, node) {
  if (!node) {
    return !menuItem.node;
  }

  if (node.leaf && !menuItem.node) {
    return true;
  }

  if (!node.leaf && menuItem.node) {
    return true;
  }

  return false;
}

/**
 * The menu that is shown when the PhyloCanvas widget is right-clicked
 *
 * @constructor
 * @memberOf PhyloCanvas
 * @extends Tooltip
 */
class ContextMenu extends Tooltip {

  constructor(tree, { menuItems = DEFAULT_MENU_ITEMS, unstyled = false, className } = {}) {
    super(tree, {
      className: `phylocanvas-context-menu ${className ? className : ''}`.trim(),
      element: document.createElement('ul'),
    });

    this.menuItems = menuItems;

    if (!unstyled) {
      require('./style.css');
    }
  }

  createSublist(menuItems, node) {
    const sublist = document.createElement('ul');
    for (const menuItem of menuItems) {
      if (!menuItemApplicable(menuItem, node)) {
        continue;
      }

      const listElement = document.createElement('li');

      if (menuItem.element) {
        listElement.appendChild(menuItem.element(this, node));
      } else {
        listElement.appendChild(document.createTextNode(menuItem.text));
        listElement.addEventListener(
          'click',
          createHandler(menuItem.node ? node : this.tree, menuItem.handler)
        );
      }

      listElement.addEventListener('click', createHandler(this, 'close'));
      listElement.addEventListener('contextmenu', preventDefault);

      sublist.appendChild(listElement);
    }

    if (sublist.hasChildNodes()) {
      this.element.appendChild(sublist);
    }
  }

  createContent(node) {
    for (const subgroup of this.menuItems) {
      this.createSublist(subgroup, node);
    }
    document.body.addEventListener('click', createHandler(this, 'close'));
  }
}

function handleContextmenu(event) {
  if (event.button === 2) {
    event.preventDefault();
    const node = this.root.clicked(...translateClick(event.clientX, event.clientY, this));
    this.contextMenu.open(event.clientX, event.clientY, node && node.interactive ? node : null);
    this.contextMenu.closed = false;
    this.tooltip.close();
  }
}

export default function contextMenuPlugin(decorate) {
  decorate(this, 'createTree', function (delegate, args) {
    const tree = delegate(...args);
    const [ , config = {} ] = args;

    tree.contextMenu = new ContextMenu(tree, config.contextMenu);
    tree.addListener('contextmenu', handleContextmenu.bind(tree));

    return tree;
  });

  this.ContextMenu = ContextMenu;
}
