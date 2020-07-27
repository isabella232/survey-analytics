import { ItemValue, QuestionMatrixModel, Question } from "survey-core";
import { SelectBase } from "./selectBase";

export class Matrix extends SelectBase {

  constructor(
    question: Question,
    data: Array<{ [index: string]: any }>,
    options?: Object
  ) {
    super(question, data, options);
  }

  public get name() {
    return "matrix";
  }

  getSeriesNames(): Array<string> {
    const question: QuestionMatrixModel = <any>this.question;
    return question.rows.map((row: ItemValue) => "" + row.value);
  }

  valuesSource(): Array<ItemValue> {
    const question: QuestionMatrixModel = <any>this.question;
    return question.columns;
  }

  getLabels(): Array<string> {
    const question: QuestionMatrixModel = <any>this.question;
    return question.rows.map((row: ItemValue) =>
      ItemValue.getTextOrHtmlByValue(question.rows, row.value)
    );
  }

  getData(): any[] {
    const question: QuestionMatrixModel = <any>this.question;
    const datasets: Array<any> = this.valuesSource().map(choice => {
      return question.rows.map((v: any) => 0);
    });

    this.data.forEach(rowData => {
      const questionValue: any = rowData[this.question.name];
      if (!!questionValue) {
        question.rows.forEach((row: any, index: number) => {
          this.getValues().forEach((val: any, dsIndex: number) => {
            if (questionValue[row.value] == val) {
              datasets[dsIndex][index]++;
            }
          });
        });
      }
    });
    return datasets;
  }
}
