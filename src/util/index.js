export function compare(a,b) {
    if (a.label > b.label) {
        return 1;
      }
    else if (a.label < b.label) {
        return -1;
      }
    else
      return 0;
}