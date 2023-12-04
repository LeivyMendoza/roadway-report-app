import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqdialog',
  templateUrl: './faqdialog.component.html',
  styleUrls: ['./faqdialog.component.css']
})
export class FAQDialogComponent implements OnInit {
  faqs = [
    {
        question: "How do I report a pothole?",
        answer: "To report a pothole, navigate to the 'Report a Pothole' section in our app. Provide the necessary details including the location, size, and, if possible, a photo of the pothole. Once submitted, our team will review and address the report as soon as possible."
    },
    {
        question: "What information should I include in my pothole report?",
        answer: "When reporting a pothole, please include the exact location (street name or coordinates), the approximate size and depth of the pothole, and any potential hazards it may cause. Additionally, uploading a photo can help us better assess the situation."
    },
    {
        question: "Can I report a pothole anonymously?",
        answer: "Yes, you can report potholes anonymously. However, providing contact information can be helpful if our team needs additional information to locate or assess the pothole."
    },
    {
        question: "How long does it take for a reported pothole to be fixed?",
        answer: "The time to fix a reported pothole can vary depending on the severity, location, and current workload. Our team prioritizes reports based on urgency and strives to address each report in a timely manner."
    },
    {
        question: "How can I check the status of a pothole I reported?",
        answer: "You can check the status of your reported potholes in the 'My Reports' section of our app. Each report will show a status of either 'Submitted', 'In Progress', or 'Resolved'."
    },
    {
        question: "What should I do if the pothole causes damage to my vehicle?",
        answer: "If a pothole causes damage to your vehicle, you should file a claim with your insurance provider. Additionally, reporting the pothole in our app helps us address it quickly to prevent further incidents."
    },
    {
        question: "Can I update or add information to a pothole report I already submitted?",
        answer: "Yes, you can update your report with additional information or photos by navigating to the 'My Reports' section and selecting the specific report you wish to update."
    },
];

  constructor() { }

  ngOnInit(): void {
  }

}