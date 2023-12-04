import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {
  comment: string = '';
  @Input() reportId: number;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reportId = data.reportId;
  }

  ngOnInit(): void {
    this.loadComments();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadComments(): void {
    this.commentService.getComments(this.reportId).subscribe(
      data => this.comment = data.length > 0 ? data[data.length - 1].content : '',
      error => console.error('Error loading comments:', error)
    );
  }

  onAddComment(): void {
    if (this.comment.trim() !== '') {
      this.commentService.addComment(this.reportId, this.comment).subscribe(
        (response) => {
          // Comment added successfully
          this.dialogRef.close('comment_added');
        },
        (error) => {
          // Handle error
          console.error('Error adding comment:', error);
        }
      );
    }
  }
}
