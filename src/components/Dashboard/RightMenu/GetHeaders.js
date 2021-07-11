import XLSX from 'xlsx';
/* generate an array of column objects */
export const get_headers = ws => {
	let h_list = [], C = XLSX.utils.decode_range(ws['!ref']).e.c + 1;
	let row = XLSX.utils.decode_range(ws['!ref']).s.r
	for(var i = 0; i < C; ++i){
		h_list.push(ws[XLSX.utils.encode_cell({r:row, c:i})].v)
	}
	return h_list;
};