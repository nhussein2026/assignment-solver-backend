// src/features/assignments/AssignmentForm.tsx
import React, { useState } from "react";
import { initialAssignmentForm } from "./initialAssignmentForm";
import { Button } from "@/components/ui/button"; // shadcn
import { Input } from "@/components/ui/input";   // shadcn
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AssignmentForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState(initialAssignmentForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="studentName" placeholder="اسم الطالب" value={formData.studentName} onChange={handleChange} />
      <Input name="studentId" placeholder="رقم الطالب" value={formData.studentId} onChange={handleChange} />
      <Input name="doctorName" placeholder="اسم الدكتور" value={formData.doctorName} onChange={handleChange} />
      
      {/* Course ID */}
      <Input name="course" placeholder="معرّف المادة (Course ID)" value={formData.course} onChange={handleChange} />

      <Input name="question" placeholder="السؤال أو الموضوع" value={formData.question} onChange={handleChange} />

      {/* Type */}
      <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={formData.type}>
        <SelectTrigger>
          <SelectValue placeholder="نوع المهمة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="homework">واجب</SelectItem>
          <SelectItem value="project">مشروع</SelectItem>
          <SelectItem value="quiz">اختبار</SelectItem>
          <SelectItem value="other">أخرى</SelectItem>
        </SelectContent>
      </Select>

      <Input name="description" placeholder="الوصف" value={formData.description} onChange={handleChange} />
      <Input name="timeToComplete" type="number" placeholder="الوقت (دقائق أو ساعات)" value={formData.timeToComplete} onChange={handleChange} />

      {/* Status */}
      <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={formData.status}>
        <SelectTrigger>
          <SelectValue placeholder="حالة المهمة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
          <SelectItem value="achieved">مكتملة</SelectItem>
          <SelectItem value="pending">بانتظار الموافقة</SelectItem>
          <SelectItem value="overdue">متأخرة</SelectItem>
        </SelectContent>
      </Select>

      <Input name="additionalInfo" placeholder="ملاحظات إضافية" value={formData.additionalInfo} onChange={handleChange} />

      <Button type="submit" className="w-full">حفظ المهمة</Button>
    </form>
  );
}
