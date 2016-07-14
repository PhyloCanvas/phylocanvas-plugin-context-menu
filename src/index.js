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
    href:
      createBlobUrl((node || tree.root).getChildProperties('label').join('\n')),
  });
}

function createSelectedLabelsLink({ tree, filenames }) {
  const labels = tree.leaves.reduce((memo, leaf) => {
    if (leaf[tree.clickFlag] === true) {
      memo.push(leaf.label);
    }
    return memo;
  }, []);
  if (labels.length === 0) {
    return null;
  }
  return createAnchorElement({
    text: this.text,
    filename: filenames.leafLabels,
    href: createBlobUrl(labels.join('\n')),
  });
}

function createNewickLink({ tree, filenames }, node) {
  return createAnchorElement({
    text: this.text,
    filename: filenames.newick,
    href: createBlobUrl((node || tree.root).getNwk()),
  });
}

function createAboutLink() {
  const anchorElement = document.createElement('a');
  const imageElement = document.createElement('img');
  imageElement.src = 'data:image/png;base64,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';
  anchorElement.appendChild(imageElement);
  anchorElement.title = 'About Phylocanvas...';
  anchorElement.href = 'http://phylocanvas.org/';
  anchorElement.target = '_blank';
  return anchorElement;
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
    text: 'Fit in Panel',
    handler(tree) {
      tree.fitInPanel();
    },
  }, {
    text: 'Redraw Original Tree',
    handler: 'redrawOriginalTree',
  } ],

  [ {
    text: 'Export Leaf Labels',
    element: createLeafLabelsLink,
  }, {
    text: 'Export Selected Labels',
    element: createSelectedLabelsLink,
  }, {
    text: 'Export as Newick File',
    element: createNewickLink,
  }, {
    text: 'Export as Image',
    element: createImageLink,
  } ],

  [ {
    element: createAboutLink,
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

  [ {
    element: createAboutLink,
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

    this.element.addEventListener('click', (event) => event.stopPropagation());
  }

  createSublist(menuItems, node) {
    const sublist = document.createElement('ul');
    for (const menuItem of menuItems) {
      let listElement = null;

      if (menuItem.element) {
        const menuItemContent = menuItem.element(this, node);
        if (menuItemContent) {
          listElement = document.createElement('li');
          listElement.appendChild(menuItemContent);
        }
      } else {
        listElement = document.createElement('li');
        listElement.appendChild(document.createTextNode(menuItem.text));
        listElement.addEventListener(
          'click',
          createHandler(node || this.tree, menuItem.handler)
        );
      }

      if (listElement) {
        listElement.addEventListener('click', createHandler(this, 'close'));
        listElement.addEventListener('contextmenu', preventDefault);

        sublist.appendChild(listElement);
      }
    }

    if (sublist.hasChildNodes()) {
      this.element.appendChild(sublist);
    }
  }

  createContent(node) {
    const menuItems =
    node && node.children.length ? this.branchMenuItems : this.menuItems;
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
  decorate(this, 'createTree', (delegate, args) => {
    const tree = delegate(...args);
    const [ , config = {} ] = args;

    if (config.contextMenu !== false) {
      tree.contextMenu = new ContextMenu(tree, config.contextMenu);
      tree.addListener('contextmenu', handleContextmenu.bind(tree));
    }

    return tree;
  });

  this.ContextMenu = ContextMenu;
}
