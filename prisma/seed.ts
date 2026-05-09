import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const colleges = [
  { name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", fees: 200000, rating: 4.8, courses: ["CS", "EE", "ME", "CE"], placements: 98, established: 1958, description: "Premier engineering institute known for research and industry connections." },
  { name: "IIT Delhi", location: "New Delhi", state: "Delhi", fees: 200000, rating: 4.7, courses: ["CS", "EE", "ME", "Physics"], placements: 97, established: 1961, description: "Top-ranked institute with strong alumni network in tech and consulting." },
  { name: "BITS Pilani", location: "Pilani", state: "Rajasthan", fees: 500000, rating: 4.5, courses: ["CS", "EE", "Mechanical", "Chemical"], placements: 92, established: 1964, description: "Known for its dual-degree programs and strong industry ties." },
  { name: "NIT Trichy", location: "Tiruchirappalli", state: "Tamil Nadu", fees: 150000, rating: 4.3, courses: ["CS", "EE", "Civil", "Production"], placements: 88, established: 1964, description: "One of the best NITs with excellent placement record." },
  { name: "VIT Vellore", location: "Vellore", state: "Tamil Nadu", fees: 180000, rating: 4.0, courses: ["CS", "EE", "ME", "Biotech"], placements: 82, established: 1984, description: "Large private university with wide industry connections." },
  { name: "Manipal Institute of Technology", location: "Manipal", state: "Karnataka", fees: 250000, rating: 3.9, courses: ["CS", "ME", "EE", "Civil"], placements: 80, established: 1957, description: "Prominent private tech university with diverse student community." },
  { name: "SRM Institute", location: "Chennai", state: "Tamil Nadu", fees: 200000, rating: 3.7, courses: ["CS", "EE", "Biotech", "MBA"], placements: 78, established: 1985, description: "Large private university with multiple campuses across India." },
  { name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", fees: 200000, rating: 4.8, courses: ["CS", "EE", "Ocean Engineering", "Aerospace"], placements: 96, established: 1959, description: "Consistently ranked #1 in India, known for research output." },
  { name: "IIT Kanpur", location: "Kanpur", state: "Uttar Pradesh", fees: 200000, rating: 4.6, courses: ["CS", "EE", "Aerospace", "Chemistry"], placements: 95, established: 1959, description: "Pioneer in CS education in India with strong research culture." },
  { name: "NIT Warangal", location: "Warangal", state: "Telangana", fees: 145000, rating: 4.2, courses: ["CS", "EE", "ME", "Civil"], placements: 86, established: 1959, description: "Top NIT in South India with strong alumni in core engineering." },
  { name: "IIIT Hyderabad", location: "Hyderabad", state: "Telangana", fees: 300000, rating: 4.4, courses: ["CS", "ECE", "Computational Linguistics"], placements: 91, established: 1998, description: "Specialized in CS and AI research with strong startup culture." },
  { name: "DTU Delhi", location: "New Delhi", state: "Delhi", fees: 160000, rating: 4.0, courses: ["CS", "EE", "ME", "Environmental"], placements: 83, established: 1941, description: "State university with strong placement in Delhi NCR companies." },
  { name: "PSG College of Technology", location: "Coimbatore", state: "Tamil Nadu", fees: 120000, rating: 3.8, courses: ["CS", "EE", "ME", "Textile"], placements: 79, established: 1951, description: "Reputed autonomous institution in South India." },
  { name: "Thapar University", location: "Patiala", state: "Punjab", fees: 220000, rating: 3.9, courses: ["CS", "ME", "EE", "Biotech"], placements: 81, established: 1956, description: "Known for tech programs and industry collaborations in North India." },
  { name: "Amity University", location: "Noida", state: "Uttar Pradesh", fees: 280000, rating: 3.5, courses: ["CS", "MBA", "Law", "Media"], placements: 72, established: 2005, description: "Large private university with multiple disciplines and global tie-ups." },
]

async function main() {
  await prisma.college.deleteMany()
  for (const c of colleges) {
    await prisma.college.create({ data: c })
  }
  console.log('Seeded', colleges.length, 'colleges')
}

main().finally(() => prisma.$disconnect())