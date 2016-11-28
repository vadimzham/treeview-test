export class Group {
  constructor(
    public group_id: number,
    public group_name: string,
    public children_groups_ids: Array<number>) { }
}
