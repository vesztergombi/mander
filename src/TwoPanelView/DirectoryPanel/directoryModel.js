
export class DirectoryModel {
  constructor(dto, showHidden = true) {
    this.rawDto = dto;
    this.filteredView = {};
    this.selection = null;
    this._showHidden = showHidden;
  }
  updateDto(dto) {
    this.rawDto = dto;
  }
  getRawDto() {
    return this.rawDto;
  }
  showHidden() {
    return this._showHidden;
  }
  getView() {
    if (!this.rawDto) {
      return [];
    }
    const displayList = toSortedViewModel(this.rawDto);

    this.filteredView = (this.showHidden()) ?
      displayList:
      displayList.filter(e => e.displayName === '..' || !e.displayName.startsWith('.'));

    return this.filteredView;
  }

  getNext(fpath) {
    const index = this.filteredView.findIndex(e => e.path === fpath)
    if (index === -1) return null
    const n = this.filteredView.length
    return this.filteredView[(index + 1) % n].path
  }

  getPrev(fpath) {
    const index = this.filteredView.findIndex(e => e.path === fpath)
    if (index === -1) return null
    const n = this.filteredView.length
    return this.filteredView[(n + index - 1) % n].path
  }

}

export const toSortedViewModel = ({directory_path, directory_content}) => {
  const addParentDir = (dir) => {
    const path = dir.split('/');
    const parent = path.splice(0, path.length-1).join('/')
    return {
      path: parent,
      isDir: true,
      displayName: '..'
    }
  };
  const n = directory_path.length
  const model = directory_content.map(entry => ({
    path: entry.path,
    isDir: entry.is_dir,
    displayName: entry.path.slice(n + 1)
  }));
  const cmp = ({ displayName: a, isDir: aIsDir }, { displayName: b, isDir: bIsDir }) => {
    const different = (aIsDir && !bIsDir) || (!aIsDir && bIsDir);
    if (different) {
      return aIsDir? -1 : 1
    }
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
  model.sort(cmp);
  model.unshift(addParentDir(directory_path));
  return model;
};

export default toSortedViewModel;
