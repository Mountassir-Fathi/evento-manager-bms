
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { StudentDialog } from "@/components/admin/StudentDialog";
import { toast } from "sonner";

interface Student {
  id: number;
  codeApogee: string;
  lastName: string;
  firstName: string;
  cin: string;
  cne: string;
  rfidUid: string;
}

// Mock data for example
const initialStudents: Student[] = [
  {
    id: 1,
    codeApogee: "18034567",
    lastName: "El Amrani",
    firstName: "Youssef",
    cin: "BE123456",
    cne: "H123456789",
    rfidUid: "A1B2C3D4"
  },
  {
    id: 2,
    codeApogee: "19045678",
    lastName: "Benani",
    firstName: "Sara",
    cin: "BB789012",
    cne: "G987654321",
    rfidUid: "E5F6G7H8"
  }
];

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleDelete = (student: Student) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant ${student.firstName} ${student.lastName} ?`)) {
      setStudents(students.filter(s => s.id !== student.id));
      toast.success("Étudiant supprimé avec succès");
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setDialogOpen(true);
  };

  const handleAddOrUpdate = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...studentData, id: editingStudent.id } 
          : s
      ));
      toast.success("Étudiant modifié avec succès");
    } else {
      setStudents([...students, { ...studentData, id: Date.now() }]);
      toast.success("Étudiant ajouté avec succès");
    }
    setDialogOpen(false);
    setEditingStudent(null);
  };

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Administration des Étudiants
          </h1>
          <Button onClick={() => setDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un étudiant
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code Apogée</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>CIN</TableHead>
                <TableHead>CNE</TableHead>
                <TableHead>UID Carte RFID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.codeApogee}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.cin}</TableCell>
                  <TableCell>{student.cne}</TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded-md">
                      {student.rfidUid}
                    </code>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(student)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(student)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <StudentDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddOrUpdate}
          student={editingStudent}
        />
      </div>
    </Layout>
  );
};

export default AdminStudents;
