import { Tooltip, utils } from 'phylocanvas';

const { createHandler, preventDefault } = utils.events;
const { createBlobUrl } = utils.dom;

function createAnchorElement({ text = 'link', filename = 'file', href }) {
  const anchorElement = document.createElement('a');
  anchorElement.appendChild(document.createTextNode(text));
  anchorElement.href = href;
  anchorElement.download = filename;
  return anchorElement;
}

function createImageLink({ tree, filenames }) {
  return createAnchorElement({
    text: this.text,
    filename: filenames.image,
    href: tree.getPngUrl(),
  });
}

function createLeafLabelsLink({ tree, filenames }, node) {
  return createAnchorElement({
    text: this.text,
    filename: filenames.leafLabels,
    href: createBlobUrl((node || tree.root).getChildProperties('label').join('\n')),
  });
}

function createNewickLink({ tree, filenames }, node) {
  return createAnchorElement({
    text: this.text,
    filename: filenames.newick,
    href: createBlobUrl((node || tree.root).getNwk()),
  });
}

export const DEFAULT_MENU_ITEMS = [

  [ {
    text: 'Show/Hide Labels',
    handler: 'toggleLabels',
  }, {
    text: 'Align/Realign Labels',
    handler(tree) {
      tree.alignLabels = !tree.alignLabels;
    },
  } ],

  [ {
    text: 'Redraw Original Tree',
    handler: 'redrawOriginalTree',
  } ],

  [ {
    text: 'Export Leaf Labels',
    element: createLeafLabelsLink,
  }, {
    text: 'Export as Newick File',
    element: createNewickLink,
  }, {
    text: 'Export as Image',
    element: createImageLink,
  } ],

];

export const DEFAULT_BRANCH_MENU_ITEMS = [

  [ {
    text: 'Collapse/Expand Subtree',
    handler(branch) {
      branch.toggleCollapsed();
      branch.tree.draw(); // some browsers do not fire mousemove after clicking
    },
  }, {
    text: 'Rotate Subtree',
    handler: 'rotate',
  } ],

  [ {
    text: 'Redraw Subtree',
    handler: 'redrawTreeFromBranch',
  } ],

  [ {
    text: 'Export Subtree Leaf Labels',
    element: createLeafLabelsLink,
  }, {
    text: 'Export Subtree as Newick File',
    element: createNewickLink,
  } ],

];

const DEFAULT_FILENAMES = {
  image: 'phylocanvas.png',
  leafLabels: 'phylocanvas-leaf-labels.txt',
  newick: 'phylocanvas.nwk',
};

/**
 * The menu that is shown when the PhyloCanvas widget is right-clicked
 *
 * @constructor
 * @memberOf PhyloCanvas
 * @extends Tooltip
 */
class ContextMenu extends Tooltip {

  constructor(tree, {
    menuItems = DEFAULT_MENU_ITEMS,
    branchMenuItems = DEFAULT_BRANCH_MENU_ITEMS,
    unstyled = false,
    className = '',
    parent,
    filenames = DEFAULT_FILENAMES,
  } = {}) {
    super(tree, {
      className: `phylocanvas-context-menu ${className}`.trim(),
      element: document.createElement('ul'),
      parent,
    });

    this.menuItems = menuItems;
    this.branchMenuItems = branchMenuItems;
    this.filenames = filenames;

    if (!unstyled) {
      require('./style.css');
    }

    this.element.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }

  createSublist(menuItems, node) {
    const sublist = document.createElement('ul');
    for (const menuItem of menuItems) {
      const listElement = document.createElement('li');

      if (menuItem.element) {
        listElement.appendChild(menuItem.element(this, node));
      } else {
        listElement.appendChild(document.createTextNode(menuItem.text));
        listElement.addEventListener(
          'click',
          createHandler(node || this.tree, menuItem.handler)
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
    const menuItems = node ? this.branchMenuItems : this.menuItems;
    for (const subgroup of menuItems) {
      this.createSublist(subgroup, node);
    }
    document.body.addEventListener('click', createHandler(this, 'close'));
  }
}

function handleContextmenu(event) {
  if (event.button === 2) {
    event.preventDefault();
    const node = this.getNodeAtMousePosition(event);
    this.contextMenu.open(
      event.clientX,
      event.clientY,
      node && node.interactive ? node : null
    );
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
