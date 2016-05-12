# Phylocanvas Context Menu Plugin
Contextual functions for Phylocanvas

## Usage
```
npm install phylocanvas phylocanvas-plugin-context-menu
```
```javascript
import Phylocanvas from 'phylocanvas';
import contextMenuPlugin from 'phylocanvas-plugin-context-menu';

Phylocanvas.plugin(contextMenuPlugin);

Phylocanvas.createTree('id', {
  contextMenu: {
    menuItems: [],
    branchMenuItems: [],
    unstyled: false,
    className: '',
    parent,
    filenames: {
      image: '',
      leafLabels: '',
      newick: '',
    }
  }
})
```
