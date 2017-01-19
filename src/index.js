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
  imageElement.src = 'data:image/svg+xml;utf8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20619.3%20166.7%22%20style%3D%22enable-background%3Anew%200%200%20619.3%20166.7%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%09.st0%7Bfill%3A%233C7383%3B%7D%09.st1%7Bfill%3A%239BB7BF%3B%7D%3C%2Fstyle%3E%3Cg%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M139.5%2C145.8V86.4h24.1c2.5%2C0%2C4.8%2C0.5%2C6.9%2C1.6c2.1%2C1.1%2C3.9%2C2.5%2C5.4%2C4.2c1.5%2C1.8%2C2.7%2C3.7%2C3.6%2C5.9%20%20%20c0.9%2C2.2%2C1.3%2C4.4%2C1.3%2C6.7c0%2C2.4-0.4%2C4.7-1.2%2C7c-0.8%2C2.2-1.9%2C4.2-3.4%2C5.9c-1.5%2C1.7-3.2%2C3.1-5.2%2C4.1c-2%2C1-4.3%2C1.5-6.7%2C1.5h-20.5v22.4%20%20%20H139.5z%20M143.8%2C119.5H164c1.9%2C0%2C3.7-0.4%2C5.2-1.2c1.5-0.8%2C2.8-1.9%2C3.9-3.3c1.1-1.4%2C1.9-2.9%2C2.5-4.7c0.6-1.8%2C0.9-3.6%2C0.9-5.5%20%20%20c0-2-0.3-3.8-1-5.6c-0.7-1.8-1.6-3.3-2.8-4.6c-1.2-1.3-2.6-2.4-4.1-3.2c-1.6-0.8-3.2-1.2-5-1.2h-19.7V119.5z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M224.6%2C145.8h-4.1v-24.3c0-5.4-0.9-9.5-2.7-12.1s-4.5-4-7.9-4c-1.8%2C0-3.5%2C0.3-5.2%2C1c-1.7%2C0.7-3.3%2C1.6-4.7%2C2.8%20%20%20c-1.5%2C1.2-2.7%2C2.7-3.8%2C4.3c-1.1%2C1.6-1.9%2C3.4-2.4%2C5.3v27h-4.1V84.7h4.1v28c1.8-3.4%2C4.2-6.1%2C7.3-8.1s6.5-3%2C10-3%20%20%20c2.4%2C0%2C4.4%2C0.4%2C6.1%2C1.3c1.7%2C0.9%2C3.1%2C2.2%2C4.3%2C3.9c1.1%2C1.7%2C2%2C3.7%2C2.5%2C6.1c0.5%2C2.4%2C0.8%2C5%2C0.8%2C8V145.8z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M238.8%2C160.7c0.5%2C0%2C1.2%2C0%2C2.2-0.1c1-0.1%2C1.7-0.2%2C2.2-0.5c0.2-0.1%2C0.5-0.4%2C0.8-0.8c0.3-0.4%2C0.7-1.1%2C1.2-2.1%20%20%20c0.5-1%2C1.1-2.4%2C1.9-4.2c0.8-1.8%2C1.7-4.2%2C2.9-7.1l-19.2-43.5h4.4l17%2C39.4l15.9-39.4h4l-23.5%2C57.3c-0.8%2C2-1.9%2C3.3-3.3%2C4%20%20%20c-1.3%2C0.6-3%2C1-4.9%2C1c-0.3%2C0-0.6%2C0-0.8%2C0c-0.3%2C0-0.6%2C0-0.8-0.1V160.7z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M318.2%2C146.7c-3%2C0-5.8-0.6-8.4-1.8c-2.6-1.2-4.8-2.8-6.6-4.9c-1.9-2.1-3.3-4.5-4.4-7.2c-1-2.7-1.6-5.6-1.6-8.6%20%20%20c0-3.1%2C0.5-6%2C1.6-8.7s2.6-5.1%2C4.5-7.2s4.1-3.7%2C6.6-4.9c2.5-1.2%2C5.3-1.8%2C8.3-1.8s5.7%2C0.6%2C8.3%2C1.8c2.6%2C1.2%2C4.8%2C2.8%2C6.7%2C4.9%20%20%20s3.4%2C4.5%2C4.5%2C7.2s1.6%2C5.6%2C1.6%2C8.7c0%2C3-0.5%2C5.9-1.6%2C8.6c-1.1%2C2.7-2.5%2C5.1-4.4%2C7.2c-1.9%2C2.1-4.1%2C3.7-6.7%2C4.9%20%20%20C323.9%2C146.1%2C321.1%2C146.7%2C318.2%2C146.7z%20M301.4%2C124.3c0%2C2.6%2C0.4%2C5%2C1.3%2C7.2c0.9%2C2.3%2C2.1%2C4.2%2C3.6%2C5.9c1.5%2C1.7%2C3.3%2C3%2C5.3%2C4%20%20%20c2%2C1%2C4.2%2C1.5%2C6.5%2C1.5s4.5-0.5%2C6.5-1.5c2-1%2C3.8-2.3%2C5.3-4.1c1.5-1.7%2C2.7-3.7%2C3.6-6s1.4-4.7%2C1.4-7.3c0-2.6-0.5-5-1.4-7.2%20%20%20c-0.9-2.3-2.1-4.2-3.6-5.9c-1.5-1.7-3.3-3.1-5.3-4.1c-2-1-4.2-1.5-6.5-1.5c-2.3%2C0-4.4%2C0.5-6.4%2C1.5c-2%2C1-3.8%2C2.4-5.4%2C4.1%20%20%20c-1.5%2C1.7-2.8%2C3.8-3.6%2C6.1C301.8%2C119.3%2C301.4%2C121.7%2C301.4%2C124.3z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M405.7%2C146.7c-2.1%2C0-4-0.3-5.8-1c-1.8-0.7-3.3-1.7-4.6-2.9c-1.3-1.2-2.3-2.7-3.1-4.4s-1.1-3.5-1.1-5.4%20%20%20c0-2.1%2C0.4-3.9%2C1.3-5.6c0.9-1.7%2C2.1-3.1%2C3.8-4.4c1.6-1.2%2C3.6-2.2%2C5.8-2.8s4.7-1%2C7.4-1c2%2C0%2C4%2C0.2%2C6%2C0.5c2%2C0.4%2C3.8%2C0.9%2C5.4%2C1.5v-3%20%20%20c0-3.2-0.9-5.8-2.7-7.6c-1.8-1.8-4.4-2.7-7.8-2.7c-2.3%2C0-4.6%2C0.4-6.8%2C1.3c-2.2%2C0.9-4.5%2C2.1-6.9%2C3.7l-2.8-5.9%20%20%20c5.6-3.8%2C11.3-5.7%2C17.3-5.7c5.9%2C0%2C10.6%2C1.5%2C13.9%2C4.6c3.3%2C3.1%2C5%2C7.5%2C5%2C13.2V135c0%2C1.1%2C0.2%2C1.8%2C0.6%2C2.3c0.4%2C0.4%2C1%2C0.7%2C2%2C0.8v7.9%20%20%20c-0.9%2C0.2-1.7%2C0.3-2.4%2C0.3c-0.7%2C0.1-1.4%2C0.1-2%2C0.1c-1.8-0.1-3.1-0.6-4-1.4c-0.9-0.8-1.5-2-1.7-3.3l-0.2-2.8%20%20%20c-1.9%2C2.6-4.3%2C4.5-7.1%2C5.9C412%2C146%2C408.9%2C146.7%2C405.7%2C146.7z%20M408.2%2C139.9c2.2%2C0%2C4.3-0.4%2C6.2-1.2c2-0.8%2C3.5-1.9%2C4.6-3.4%20%20%20c1.2-1%2C1.7-2.1%2C1.7-3.2v-5.8c-1.5-0.6-3.2-1.1-4.9-1.4s-3.4-0.5-5.1-0.5c-3.2%2C0-5.9%2C0.7-8%2C2.1s-3.1%2C3.3-3.1%2C5.7%20%20%20c0%2C2.2%2C0.8%2C4%2C2.4%2C5.5C403.7%2C139.2%2C405.7%2C139.9%2C408.2%2C139.9z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M479.7%2C145.8h-9.1v-24.5c0-4.1-0.7-7.1-2-9c-1.3-1.9-3.2-2.8-5.7-2.8c-1.3%2C0-2.7%2C0.3-4%2C0.8%20%20%20c-1.3%2C0.5-2.6%2C1.2-3.8%2C2.1c-1.2%2C0.9-2.2%2C2-3.1%2C3.3s-1.6%2C2.6-2.1%2C4.1v26h-9.1V102h8.3v8.8c1.7-3%2C4-5.3%2C7.2-7%20%20%20c3.1-1.7%2C6.6-2.6%2C10.4-2.6c2.6%2C0%2C4.7%2C0.5%2C6.4%2C1.4c1.7%2C0.9%2C3%2C2.2%2C4%2C3.9c1%2C1.6%2C1.6%2C3.5%2C2%2C5.7c0.4%2C2.1%2C0.6%2C4.4%2C0.6%2C6.8V145.8z%22%2F%3E%09%3Cpolygon%20class%3D%22st0%22%20points%3D%22501.3%2C145.8%20484.8%2C102%20494.2%2C102%20506.5%2C138.1%20519%2C102%20527.6%2C102%20511.1%2C145.8%20%20%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M544.3%2C146.7c-2.1%2C0-4-0.3-5.8-1c-1.8-0.7-3.3-1.7-4.6-2.9c-1.3-1.2-2.3-2.7-3.1-4.4s-1.1-3.5-1.1-5.4%20%20%20c0-2.1%2C0.4-3.9%2C1.3-5.6c0.9-1.7%2C2.1-3.1%2C3.8-4.4c1.6-1.2%2C3.6-2.2%2C5.8-2.8c2.2-0.7%2C4.7-1%2C7.4-1c2%2C0%2C4%2C0.2%2C6%2C0.5%20%20%20c2%2C0.4%2C3.8%2C0.9%2C5.4%2C1.5v-3c0-3.2-0.9-5.8-2.7-7.6c-1.8-1.8-4.4-2.7-7.8-2.7c-2.3%2C0-4.6%2C0.4-6.8%2C1.3c-2.2%2C0.9-4.5%2C2.1-6.9%2C3.7%20%20%20l-2.8-5.9c5.6-3.8%2C11.3-5.7%2C17.3-5.7c5.9%2C0%2C10.6%2C1.5%2C13.9%2C4.6c3.3%2C3.1%2C5%2C7.5%2C5%2C13.2V135c0%2C1.1%2C0.2%2C1.8%2C0.6%2C2.3c0.4%2C0.4%2C1%2C0.7%2C2%2C0.8%20%20%20v7.9c-0.9%2C0.2-1.7%2C0.3-2.4%2C0.3c-0.7%2C0.1-1.4%2C0.1-2%2C0.1c-1.8-0.1-3.1-0.6-4-1.4c-0.9-0.8-1.5-2-1.7-3.3l-0.2-2.8%20%20%20c-1.9%2C2.6-4.3%2C4.5-7.1%2C5.9C550.6%2C146%2C547.6%2C146.7%2C544.3%2C146.7z%20M546.8%2C139.9c2.2%2C0%2C4.3-0.4%2C6.2-1.2c2-0.8%2C3.5-1.9%2C4.6-3.4%20%20%20c1.2-1%2C1.7-2.1%2C1.7-3.2v-5.8c-1.5-0.6-3.2-1.1-4.9-1.4c-1.7-0.3-3.4-0.5-5.1-0.5c-3.2%2C0-5.9%2C0.7-8%2C2.1s-3.1%2C3.3-3.1%2C5.7%20%20%20c0%2C2.2%2C0.8%2C4%2C2.4%2C5.5C542.3%2C139.2%2C544.3%2C139.9%2C546.8%2C139.9z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M595.7%2C146.7c-1.8%2C0-3.5-0.1-5.3-0.4c-1.8-0.3-3.6-0.7-5.3-1.2c-1.7-0.5-3.4-1.2-5-1.9s-3-1.6-4.2-2.6l3.8-6.2%20%20%20c5.3%2C3.7%2C10.5%2C5.6%2C15.8%2C5.6c2.8%2C0%2C4.9-0.5%2C6.5-1.6c1.6-1.1%2C2.4-2.6%2C2.4-4.5c0-1.8-0.9-3.2-2.7-4.1c-1.8-0.9-4.6-1.8-8.5-2.7%20%20%20c-2.7-0.7-5-1.4-6.9-2.1c-1.9-0.7-3.5-1.5-4.7-2.3c-1.2-0.9-2.1-1.9-2.6-3.1c-0.6-1.2-0.8-2.6-0.8-4.3c0-2.2%2C0.4-4.2%2C1.3-5.9%20%20%20c0.9-1.7%2C2.1-3.2%2C3.6-4.4c1.5-1.2%2C3.3-2.1%2C5.4-2.7c2.1-0.6%2C4.3-0.9%2C6.6-0.9c3.1%2C0%2C6.2%2C0.5%2C9.1%2C1.5c2.9%2C1%2C5.5%2C2.4%2C7.8%2C4.1l-3.9%2C5.6%20%20%20c-4.1-3.1-8.5-4.7-13.2-4.7c-2.3%2C0-4.3%2C0.5-5.9%2C1.5c-1.6%2C1-2.4%2C2.5-2.4%2C4.6c0%2C0.9%2C0.2%2C1.6%2C0.5%2C2.3c0.3%2C0.6%2C0.9%2C1.1%2C1.6%2C1.6%20%20%20c0.7%2C0.4%2C1.7%2C0.9%2C2.9%2C1.2c1.2%2C0.4%2C2.7%2C0.8%2C4.5%2C1.2c3%2C0.7%2C5.5%2C1.5%2C7.7%2C2.2c2.1%2C0.7%2C3.9%2C1.6%2C5.3%2C2.6c1.4%2C1%2C2.4%2C2.1%2C3.1%2C3.4%20%20%20c0.7%2C1.3%2C1%2C2.9%2C1%2C4.7c0%2C2.1-0.4%2C3.9-1.2%2C5.6c-0.8%2C1.7-2%2C3.1-3.5%2C4.3c-1.5%2C1.2-3.4%2C2.1-5.5%2C2.7C600.8%2C146.4%2C598.3%2C146.7%2C595.7%2C146.7%20%20%20z%22%2F%3E%09%3Cpath%20class%3D%22st0%22%20d%3D%22M345.5%2C124c0-3.1%2C0.5-6%2C1.6-8.7c1.1-2.7%2C2.6-5.1%2C4.6-7.2c2-2.1%2C4.4-3.7%2C7.1-4.9c2.8-1.2%2C5.9-1.8%2C9.4-1.8%20%20%20c4.5%2C0%2C8.4%2C1%2C11.7%2C3c3.3%2C2%2C5.7%2C4.6%2C7.3%2C7.9l-8.9%2C2.8c-1.1-1.8-2.5-3.3-4.3-4.3c-1.8-1-3.8-1.5-5.9-1.5c-1.8%2C0-3.6%2C0.4-5.1%2C1.1%20%20%20c-1.6%2C0.7-3%2C1.7-4.1%2C3c-1.2%2C1.3-2.1%2C2.9-2.8%2C4.6c-0.7%2C1.8-1%2C3.8-1%2C5.9c0%2C2.1%2C0.3%2C4.1%2C1%2C5.9c0.7%2C1.8%2C1.6%2C3.4%2C2.8%2C4.7%20%20%20c1.2%2C1.3%2C2.6%2C2.4%2C4.2%2C3.1c1.6%2C0.8%2C3.3%2C1.1%2C5.1%2C1.1c1.1%2C0%2C2.2-0.2%2C3.3-0.5c1.1-0.3%2C2.1-0.7%2C3-1.3c0.9-0.6%2C1.7-1.2%2C2.4-1.9%20%20%20c0.7-0.7%2C1.2-1.5%2C1.5-2.3l9%2C2.7c-1.4%2C3.3-3.9%2C6-7.3%2C8.1c-3.4%2C2.1-7.4%2C3.1-12%2C3.1c-3.4%2C0-6.5-0.6-9.3-1.8c-2.8-1.2-5.2-2.9-7.1-5%20%20%20c-2-2.1-3.5-4.5-4.6-7.2C346.1%2C129.9%2C345.5%2C127%2C345.5%2C124z%22%2F%3E%09%3Cpolygon%20class%3D%22st0%22%20points%3D%22280.8%2C84.7%20285.1%2C84.7%20285.1%2C146.3%20280.8%2C146.3%20%20%22%2F%3E%09%3Cpath%20class%3D%22st1%22%20d%3D%22M110.6%2C105.2c0-0.2%2C0.1-0.3%2C0.1-0.5c0-0.1%2C0-0.3%2C0.1-0.4c0-0.2%2C0-0.4%2C0.1-0.6c0-0.2%2C0-0.4%2C0-0.6%20%20%20c0-0.1%2C0-0.2%2C0-0.4c0-0.1%2C0-0.3%2C0-0.4l0-0.3c0-0.1%2C0-0.3%2C0-0.4c0-0.2%2C0-0.3%2C0-0.4l0-0.2c0-0.2%2C0-0.4-0.1-0.5l0-0.2%20%20%20c0-0.2-0.1-0.4-0.1-0.6l0-0.1c0-0.2-0.1-0.3-0.1-0.5l-0.1-0.2c0-0.1-0.1-0.3-0.1-0.4l-0.1-0.2c0-0.1-0.1-0.3-0.1-0.4%20%20%20c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.4l-0.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.2-0.2-0.4-0.3-0.6l-0.1-0.1%20%20%20c-0.1-0.2-0.2-0.3-0.2-0.5l-0.1-0.2c-0.1-0.2-0.2-0.3-0.3-0.5l0-0.1c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.2-0.2-0.4-0.4-0.6l-0.1-0.1%20%20%20c-0.1-0.2-0.2-0.3-0.4-0.5c-0.1-0.2-0.3-0.4-0.4-0.5l0%2C0c-0.1-0.2-0.3-0.3-0.4-0.5c-0.2-0.2-0.3-0.3-0.5-0.5%20%20%20c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.2-0.4-0.3-0.5-0.5c-0.2-0.2-0.5-0.4-0.8-0.6l-0.4-0.2c-0.2-0.1-0.4-0.2-0.5-0.3%20%20%20c-0.2-0.1-0.4-0.3-0.7-0.4l-0.1-0.1c-0.2-0.1-0.4-0.2-0.6-0.3c-0.2-0.1-0.4-0.2-0.7-0.3l-0.1%2C0c-3.1-1.3-5.9-3-8.4-5.1%20%20%20c-3.1-2.7-5.6-5.9-7.4-9.5l0%2C0c-1.4-2.9-2.4-6.1-2.9-9.3c0-0.1%2C0-0.3-0.1-0.4c-0.8-5.1-4.2-9.6-9.3-11.7%20%20%20c-5.1-2.1-10.7-1.2-14.8%2C1.9c-0.2%2C0.2-0.4%2C0.3-0.6%2C0.4c-1.9%2C1.6-3.5%2C3.6-4.4%2C6c-1%2C2.4-1.3%2C4.9-1%2C7.4l0%2C0c0%2C0.2%2C0.1%2C0.5%2C0.1%2C0.7l0%2C0%20%20%20c0.8%2C5.1%2C4.2%2C9.6%2C9.3%2C11.7l0%2C0c2.2%2C0.9%2C4.2%2C2%2C6.1%2C3.3c0.4%2C0.3%2C0.8%2C0.6%2C1.2%2C0.9l0%2C0c0.4%2C0.3%2C0.7%2C0.6%2C1.1%2C0.9l0%2C0l0%2C0l0%2C0%20%20%20c3.1%2C2.7%2C5.6%2C5.9%2C7.3%2C9.5c1.4%2C2.8%2C2.4%2C5.8%2C2.8%2C8.9l0%2C0.1c0%2C0.3%2C0.1%2C0.5%2C0.1%2C0.8c0%2C0.3%2C0.1%2C0.6%2C0.2%2C0.9c0.1%2C0.2%2C0.1%2C0.5%2C0.2%2C0.7%20%20%20l0.1%2C0.2l0%2C0c0.1%2C0.2%2C0.1%2C0.4%2C0.2%2C0.6c0.1%2C0.2%2C0.2%2C0.5%2C0.3%2C0.7l0.1%2C0.3l0%2C0c0.1%2C0.2%2C0.2%2C0.4%2C0.3%2C0.6c0.1%2C0.3%2C0.3%2C0.5%2C0.4%2C0.8l0%2C0%20%20%20c0.1%2C0.2%2C0.3%2C0.5%2C0.4%2C0.7c0.2%2C0.2%2C0.3%2C0.5%2C0.5%2C0.7c0.2%2C0.2%2C0.3%2C0.5%2C0.5%2C0.7c0.1%2C0.1%2C0.2%2C0.3%2C0.4%2C0.4c0.2%2C0.2%2C0.4%2C0.5%2C0.6%2C0.7%20%20%20c0.2%2C0.2%2C0.3%2C0.3%2C0.5%2C0.5c0.1%2C0.1%2C0.3%2C0.2%2C0.4%2C0.4c0.2%2C0.2%2C0.4%2C0.4%2C0.6%2C0.5c0.2%2C0.2%2C0.5%2C0.3%2C0.7%2C0.5c0.2%2C0.2%2C0.5%2C0.3%2C0.7%2C0.5%20%20%20c0.1%2C0.1%2C0.3%2C0.2%2C0.5%2C0.3l0.4%2C0.2l0.3%2C0.1c0.1%2C0.1%2C0.3%2C0.1%2C0.4%2C0.2c0.2%2C0.1%2C0.4%2C0.2%2C0.7%2C0.3l0.1%2C0c0.2%2C0.1%2C0.4%2C0.2%2C0.7%2C0.3%20%20%20c7.6%2C2.7%2C16-1.1%2C19.1-8.6C110.1%2C107%2C110.4%2C106.1%2C110.6%2C105.2z%22%2F%3E%09%3Cpath%20class%3D%22st1%22%20d%3D%22M12.3%2C84.1c0.1%2C0.1%2C0.3%2C0.2%2C0.4%2C0.3c0.1%2C0.1%2C0.2%2C0.2%2C0.3%2C0.3c0.2%2C0.1%2C0.3%2C0.2%2C0.5%2C0.3c0.2%2C0.1%2C0.3%2C0.2%2C0.5%2C0.4%20%20%20l0.3%2C0.2l0.3%2C0.2l0.2%2C0.1c0.1%2C0.1%2C0.2%2C0.1%2C0.4%2C0.2c0.1%2C0.1%2C0.3%2C0.1%2C0.4%2C0.2l0.2%2C0.1c0.2%2C0.1%2C0.3%2C0.1%2C0.5%2C0.2l0.1%2C0.1%20%20%20c0.2%2C0.1%2C0.4%2C0.1%2C0.6%2C0.2l0.1%2C0c0.2%2C0.1%2C0.3%2C0.1%2C0.5%2C0.2l0.2%2C0.1c0.1%2C0%2C0.3%2C0.1%2C0.4%2C0.1l0.2%2C0.1c0.1%2C0%2C0.3%2C0.1%2C0.4%2C0.1%20%20%20c0.1%2C0%2C0.2%2C0.1%2C0.3%2C0.1c0.1%2C0%2C0.2%2C0.1%2C0.4%2C0.1l0.2%2C0c0.2%2C0%2C0.4%2C0.1%2C0.6%2C0.1c0.2%2C0%2C0.4%2C0.1%2C0.6%2C0.1l0.1%2C0c0.2%2C0%2C0.4%2C0%2C0.5%2C0l0.2%2C0%20%20%20c0.2%2C0%2C0.4%2C0%2C0.6%2C0l0.1%2C0c0.2%2C0%2C0.4%2C0%2C0.6%2C0c0.2%2C0%2C0.4%2C0%2C0.7%2C0l0.1%2C0c0.2%2C0%2C0.4%2C0%2C0.6-0.1c0.2%2C0%2C0.4-0.1%2C0.7-0.1l0.1%2C0%20%20%20c0.2%2C0%2C0.4-0.1%2C0.6-0.1c0.2-0.1%2C0.5-0.1%2C0.7-0.2c0.2-0.1%2C0.4-0.1%2C0.7-0.2c0.2-0.1%2C0.4-0.2%2C0.7-0.2c0.3-0.1%2C0.6-0.2%2C0.9-0.4%20%20%20c0.1-0.1%2C0.3-0.1%2C0.4-0.2c0.2-0.1%2C0.4-0.2%2C0.6-0.3c0.2-0.1%2C0.4-0.2%2C0.6-0.4l0.1-0.1c0.2-0.1%2C0.4-0.2%2C0.6-0.4%20%20%20c0.2-0.1%2C0.4-0.3%2C0.6-0.4l0.1%2C0c2.7-2.1%2C5.6-3.7%2C8.6-4.7c3.9-1.4%2C7.9-1.9%2C11.9-1.7l0%2C0c3.3%2C0.2%2C6.5%2C0.9%2C9.5%2C2.1%20%20%20c0.1%2C0.1%2C0.3%2C0.1%2C0.4%2C0.2c4.8%2C1.8%2C10.4%2C1.2%2C14.8-2.2c4.4-3.4%2C6.4-8.7%2C5.8-13.8c0-0.2-0.1-0.5-0.1-0.7c-0.4-2.4-1.4-4.8-3-6.9%20%20%20c-1.6-2.1-3.6-3.6-5.9-4.6l0%2C0c-0.2-0.1-0.5-0.2-0.7-0.3l0%2C0c-4.8-1.8-10.4-1.1-14.7%2C2.2l0%2C0c-1.9%2C1.5-3.8%2C2.7-5.9%2C3.6%20%20%20c-0.5%2C0.2-0.9%2C0.4-1.4%2C0.6l0%2C0c-0.4%2C0.2-0.9%2C0.3-1.3%2C0.5l0%2C0l0%2C0l0%2C0c-3.9%2C1.3-7.9%2C1.9-11.9%2C1.6c-3.1-0.2-6.2-0.9-9.2-2l0%2C0%20%20%20c-0.3-0.1-0.5-0.2-0.8-0.3c-0.3-0.1-0.5-0.2-0.8-0.3c-0.2-0.1-0.5-0.1-0.7-0.2l-0.2-0.1l0%2C0c-0.2-0.1-0.4-0.1-0.7-0.1%20%20%20c-0.3%2C0-0.5-0.1-0.8-0.1l-0.3%2C0l0%2C0c-0.2%2C0-0.5%2C0-0.7-0.1c-0.3%2C0-0.6%2C0-0.8%2C0l0%2C0c-0.3%2C0-0.6%2C0-0.9%2C0c-0.3%2C0-0.6%2C0-0.9%2C0.1%20%20%20c-0.3%2C0-0.6%2C0.1-0.9%2C0.1c-0.2%2C0-0.4%2C0.1-0.5%2C0.1c-0.3%2C0.1-0.6%2C0.1-0.9%2C0.2c-0.2%2C0.1-0.5%2C0.1-0.7%2C0.2c-0.2%2C0.1-0.3%2C0.1-0.5%2C0.2%20%20%20c-0.3%2C0.1-0.5%2C0.2-0.8%2C0.3c-0.3%2C0.1-0.5%2C0.2-0.8%2C0.3c-0.3%2C0.1-0.5%2C0.3-0.8%2C0.4c-0.2%2C0.1-0.3%2C0.2-0.5%2C0.3c-0.1%2C0.1-0.2%2C0.1-0.4%2C0.2%20%20%20L14%2C59.9c-0.1%2C0.1-0.3%2C0.2-0.4%2C0.3c-0.2%2C0.1-0.4%2C0.3-0.6%2C0.4l-0.1%2C0c-0.2%2C0.1-0.4%2C0.3-0.6%2C0.5c-6.1%2C5.3-7.1%2C14.5-2%2C20.9%20%20%20C10.9%2C82.8%2C11.6%2C83.5%2C12.3%2C84.1z%22%2F%3E%09%3Cpath%20class%3D%22st1%22%20d%3D%22M72.6%2C80.7c0.2-0.1%2C0.3-0.1%2C0.5-0.2c0.1-0.1%2C0.3-0.1%2C0.4-0.2c0.2-0.1%2C0.4-0.2%2C0.5-0.2c0.2-0.1%2C0.4-0.2%2C0.6-0.3%20%20%20c0.1-0.1%2C0.2-0.1%2C0.3-0.2c0.1-0.1%2C0.2-0.1%2C0.3-0.2l0.2-0.1c0.1-0.1%2C0.2-0.1%2C0.4-0.2c0.1-0.1%2C0.2-0.2%2C0.4-0.2l0.2-0.1%20%20%20c0.1-0.1%2C0.3-0.2%2C0.4-0.3l0.1-0.1c0.2-0.1%2C0.3-0.3%2C0.5-0.4l0%2C0c0.1-0.1%2C0.3-0.2%2C0.4-0.3l0.2-0.2c0.1-0.1%2C0.2-0.2%2C0.3-0.3l0.2-0.2%20%20%20l0.3-0.3l0.2-0.3l0.2-0.3l0.1-0.2c0.1-0.1%2C0.3-0.3%2C0.4-0.5c0.1-0.2%2C0.2-0.3%2C0.4-0.5l0.1-0.1c0.1-0.1%2C0.2-0.3%2C0.3-0.4l0.1-0.1%20%20%20c0.1-0.2%2C0.2-0.3%2C0.3-0.5l0-0.1c0.1-0.2%2C0.2-0.4%2C0.3-0.6c0.1-0.2%2C0.2-0.4%2C0.3-0.6l0-0.1c0.1-0.2%2C0.2-0.4%2C0.2-0.6%20%20%20c0.1-0.2%2C0.2-0.4%2C0.2-0.6l0-0.1c0.1-0.2%2C0.1-0.4%2C0.2-0.6c0.1-0.2%2C0.1-0.4%2C0.2-0.7c0.1-0.2%2C0.1-0.5%2C0.1-0.7c0-0.2%2C0.1-0.5%2C0.1-0.7%20%20%20c0-0.3%2C0.1-0.6%2C0.1-1c0-0.1%2C0-0.3%2C0-0.4c0-0.2%2C0-0.4%2C0-0.6c0-0.3%2C0-0.5%2C0-0.8l0-0.2c0-0.2%2C0-0.4%2C0-0.7c0-0.2%2C0-0.5-0.1-0.7l0-0.1%20%20%20c-0.5-3.4-0.4-6.7%2C0.2-9.8c0.7-4%2C2.3-7.8%2C4.5-11.2l0%2C0c1.8-2.7%2C4-5.2%2C6.6-7.2c0.1-0.1%2C0.2-0.2%2C0.3-0.3c4-3.3%2C6.2-8.5%2C5.4-13.9%20%20%20c-0.8-5.5-4.4-9.8-9.1-11.9c-0.2-0.1-0.5-0.2-0.7-0.3c-2.3-0.9-4.8-1.2-7.4-0.8c-2.6%2C0.4-4.9%2C1.4-6.9%2C2.8l0%2C0%20%20%20c-0.2%2C0.2-0.4%2C0.3-0.6%2C0.5l0%2C0c-3.9%2C3.3-6.2%2C8.4-5.4%2C13.9l0%2C0c0.3%2C2.3%2C0.4%2C4.7%2C0.2%2C6.9c0%2C0.5-0.1%2C1-0.2%2C1.5l0%2C0%20%20%20c-0.1%2C0.5-0.1%2C0.9-0.2%2C1.4l0%2C0l0%2C0l0%2C0c-0.7%2C4-2.3%2C7.8-4.5%2C11.1c-1.7%2C2.6-3.8%2C5-6.3%2C7l0%2C0c-0.2%2C0.2-0.4%2C0.3-0.6%2C0.5%20%20%20c-0.2%2C0.2-0.4%2C0.4-0.7%2C0.6c-0.2%2C0.2-0.4%2C0.3-0.5%2C0.5l-0.2%2C0.2l0%2C0c-0.2%2C0.2-0.3%2C0.3-0.4%2C0.5c-0.2%2C0.2-0.3%2C0.4-0.5%2C0.6l-0.2%2C0.3l0%2C0%20%20%20c-0.1%2C0.2-0.3%2C0.4-0.4%2C0.6c-0.2%2C0.2-0.3%2C0.5-0.5%2C0.7l0%2C0c-0.1%2C0.2-0.3%2C0.5-0.4%2C0.7c-0.1%2C0.3-0.3%2C0.5-0.4%2C0.8%20%20%20c-0.1%2C0.3-0.2%2C0.5-0.3%2C0.8c-0.1%2C0.2-0.1%2C0.3-0.2%2C0.5c-0.1%2C0.3-0.2%2C0.6-0.3%2C0.9c-0.1%2C0.2-0.1%2C0.5-0.2%2C0.7c0%2C0.2-0.1%2C0.3-0.1%2C0.5%20%20%20c0%2C0.3-0.1%2C0.6-0.1%2C0.8c0%2C0.3-0.1%2C0.6-0.1%2C0.8c0%2C0.3%2C0%2C0.6%2C0%2C0.9c0%2C0.2%2C0%2C0.4%2C0%2C0.5c0%2C0.1%2C0%2C0.3%2C0%2C0.4l0%2C0.3c0%2C0.2%2C0%2C0.3%2C0%2C0.5%20%20%20c0%2C0.2%2C0%2C0.5%2C0.1%2C0.7l0%2C0.1c0%2C0.2%2C0.1%2C0.5%2C0.1%2C0.7c1.5%2C7.9%2C9%2C13.3%2C17.1%2C12.2C70.7%2C81.3%2C71.7%2C81%2C72.6%2C80.7z%22%2F%3E%09%3Ccircle%20class%3D%22st0%22%20cx%3D%2222.5%22%20cy%3D%2272.6%22%20r%3D%2215.2%22%2F%3E%09%3Ccircle%20class%3D%22st0%22%20cx%3D%2295.5%22%20cy%3D%22102.1%22%20r%3D%2215.2%22%2F%3E%09%3Ccircle%20class%3D%22st0%22%20cx%3D%2284.6%22%20cy%3D%2223.9%22%20r%3D%2215.2%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
  imageElement.style = 'width: 124px; margin: 4px auto 0';
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
  }, {
    text: 'Expand All',
    handler(tree) {
      for (const branchId of Object.keys(tree.branches)) {
        tree.branches[branchId].expand();
      }
    },
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
    text: 'Invert Subtree',
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

  cleanup() {
    this.element.parentNode.removeChild(this.element);
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

function onCleanup(delegate) {
  this.contextMenu.cleanup();
  delegate.call(this);
}

export default function contextMenuPlugin(decorate) {
  decorate(this, 'createTree', (delegate, args) => {
    const tree = delegate(...args);
    const [ , config = {} ] = args;

    if (config.contextMenu !== false) {
      tree.contextMenu = new ContextMenu(tree, config.contextMenu);
      tree.addListener('contextmenu', handleContextmenu.bind(tree));
      decorate(tree, 'cleanup', onCleanup);
    }

    return tree;
  });

  this.ContextMenu = ContextMenu;
}
