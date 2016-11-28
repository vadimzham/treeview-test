import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'primeng/primeng';

import { GroupService } from './group.service';
import { Group } from './group';

@Component({
  selector: 'group',
  providers: [GroupService],
  styleUrls: ['./group.component.styl'],
  templateUrl: './group.component.pug'
})
export class GroupComponent {
  message: string;
  error: string;
  groups: any;
  files: TreeNode[];

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.groupService.getGroup(+params['id']))
      .subscribe((group: Group) => this.renderTree(group),
                  error => this.error = <any>error);
  }

  renderTree(group){
    this.groups = [this.renderNode(group)]
  }

  renderNode(group){
    let node = {
      id: group.group_id,
      label: group.group_name,
      childrenIds: group.children_groups_ids,
      leaf: !group.children_groups_ids.length
    };
    return node;
  }

  loadNodes(event) {
    if(event.node) {
      event.node.children = [];
      event.node.childrenIds.forEach((id) =>
        this.groupService.getGroup(id)
          .subscribe(
          group => event.node.children.push(this.renderNode(group)),
          error => this.error = <any>error)
      )
    }
  }

  changeGroup(group) {
    this.groupService.changeGroup(group)
      .subscribe(
      group => this.changeOk(group.group_id),
      error => this.error = <any>error);
  }

  changeOk(id){
    this.message = 'Group ' + id + ' successfully changed';
    setTimeout(() => this.message = '', 3000)
  }
}
