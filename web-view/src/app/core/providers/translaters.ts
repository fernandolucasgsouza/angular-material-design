import { MatPaginator } from '@angular/material';

export class Translaters {

  public static paginatorPTBR(item_mat: MatPaginator) {
    item_mat._intl.itemsPerPageLabel = 'Itens por página';
    item_mat._intl.nextPageLabel = "Próxima";
    item_mat._intl.previousPageLabel = "Anterior";
    item_mat._intl.lastPageLabel = "Ultima página";
    item_mat._intl.firstPageLabel = "Primera página";
  }
}