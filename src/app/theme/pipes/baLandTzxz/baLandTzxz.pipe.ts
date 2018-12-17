import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';

@Pipe({ name: 'baLandTzxz' })
export class BaLandTzxzPipe implements PipeTransform {
    transform(value, args) {
        var ret = ''
        switch (value) {
            case '1': ret = '内资企业'; break;
            case '11': ret = '国有企业'; break;
            case '12': ret = '集体企业'; break;
            case '13': ret = '股份合作企业'; break;
            case '14': ret = '联营企业'; break;
            case '141': ret = '国有联营企业'; break;
            case '142': ret = '集体联营企业'; break;
            case '143': ret = '国有与集体联营企业'; break;
            case '149': ret = '其他联营企业'; break;
            case '15': ret = '有限责任公司'; break;
            case '151': ret = '国有独资公司'; break;
            case '159': ret = '其他有限责任公司'; break;
            case '16': ret = '股份有限公司'; break;
            case '17': ret = '私营企业'; break;
            case '171': ret = '私营独资企业'; break;
            case '172': ret = '私营合伙企业'; break;
            case '173': ret = '私营有限责任公司'; break;
            case '174': ret = '私营股份有限公司'; break;
            case '19': ret = '其他内资企业'; break;
            case '2': ret = '港、澳、台商投资企业'; break;
            case '21': ret = '合资经营企业'; break;
            case '22': ret = '合作经营企业'; break;
            case '23': ret = '港、澳、台商独资企业'; break;
            case '24': ret = '港、澳、台商投资股份有限公司'; break;
            case '3': ret = '外商投资企业'; break;
            case '31': ret = '中外合资经营企业'; break;
            case '32': ret = '中外合作经营企业'; break;
            case '33': ret = '外资（独资）企业'; break;
            case '34': ret = '外商投资股份有限公司'; break;
            case '4': ret = '机关团体'; break;
            case '5': ret = '事业单位'; break;
            case '6': ret = '社团(包括村委会)'; break;
            case '7': ret = '个人'; break;
            default: ret = '未知';
        }
        return ret;
    }
}

