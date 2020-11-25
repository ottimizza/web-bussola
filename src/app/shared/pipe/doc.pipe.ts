import { Pipe, PipeTransform } from '@angular/core';
import { DocUtils } from '@shared/utils/doc.utils';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return value; }

    // Validação de CNPJ.
    const isCNPJ = DocUtils.validateCPForCNPJ(value);

    return isCNPJ ? DocUtils.format(value) : value;
  }

}
