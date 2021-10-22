import React from 'react'
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList'

export interface IListItem {
  key: number
  name: string
  output: string
  description: string
}

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'style',
    fieldName: 'name',
    minWidth: 30,
    maxWidth: 30,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'output',
    fieldName: 'output',
    minWidth: 100,
    maxWidth: window.innerWidth <= 768 ? 127 : 150,
    isResizable: true,
  },
  {
    key: 'column3',
    name: 'description',
    fieldName: 'description',
    minWidth: 100,
    maxWidth: window.innerWidth <= 768 ? 152 : 200,
    isResizable: true,
  },
]

const listItems: IListItem[] = [
  {
    key: 1,
    name: 't',
    output: '15:00',
    description: 'Short Time',
  },
  {
    key: 2,
    name: 'T',
    output: '15:00:30',
    description: 'Long Time',
  },
  {
    key: 3,
    name: 'd',
    output: '21/04/2021',
    description: 'Short Date',
  },
  {
    key: 4,
    name: 'D',
    output: 'April 21 20201',
    description: 'Long Date',
  },
  {
    key: 4,
    name: 'f',
    output: 'April 21 2021, 16:20',
    description: 'Short Date + Short Time',
  },
  {
    key: 5,
    name: 'F*',
    output: 'Tue., April 20 2021 16:20',
    description: 'Long date with time',
  },
  {
    key: 6,
    name: 'R',
    output: '2 minutes ago',
    description: 'Time relative to current',
  },
]

export class FormatTable extends React.Component {
  private readonly items = listItems
  private readonly columns = columns;

  public render(): JSX.Element {
    return (
      <>{
        window.innerWidth <= 768 ? null : (<><DetailsList
          compact
          selectionMode={SelectionMode.none}
          items={this.items}
          columns={this.columns}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          setKey="none"
        />
          <span>* default</span></>)
      }

      </>
    )
  }
}
