// Mock Data for Vietnamese Resident Portal

export interface HouseholdMember {
  id: string;
  name: string;
  role: 'Chủ hộ' | 'Vợ/Chồng' | 'Con' | 'Cha/Mẹ' | 'Khác';
  dob: string;
  gender: 'Nam' | 'Nữ';
  idCard: string;
  idIssueDate: string;
  idIssuePlace: string;
  ethnicity: string;
  religion: string;
  occupation: string;
  workplace: string;
  registrationDate: string;
  previousAddress: string;
  avatar?: string;
}

export interface Household {
  id: string;
  code: string;
  address: string;
  members: HouseholdMember[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: 'meeting' | 'health' | 'payment' | 'event';
}

export interface BookingSlot {
  id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
  bookedBy?: string;
}

export interface Request {
  id: string;
  type: 'tam_vang' | 'tam_tru' | 'dat_lich' | 'bien_dong';
  applicantName: string;
  householdCode: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  details: Record<string, any>;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  totalQuantity: number;
  brokenQuantity: number;
  notes: string;
}

// Current User Household
export const currentHousehold: Household = {
  id: 'hh-001',
  code: 'TDP7-2024-001',
  address: 'Số 10, Ngõ 5, Đường Lê Trọng Tấn, Phường La Khê, Quận Hà Đông, TP. Hà Nội',
  members: [
    {
      id: 'm1',
      name: 'Nguyễn Văn An',
      role: 'Chủ hộ',
      dob: '15/03/1975',
      gender: 'Nam',
      idCard: '001075012345',
      idIssueDate: '20/05/2021',
      idIssuePlace: 'Cục CS QLHC về TTXH',
      ethnicity: 'Kinh',
      religion: 'Không',
      occupation: 'Kỹ sư xây dựng',
      workplace: 'Công ty CP Xây dựng Hà Nội',
      registrationDate: '01/01/2010',
      previousAddress: 'Số 5, Phố Huế, Quận Hoàn Kiếm, Hà Nội',
    },
    {
      id: 'm2',
      name: 'Trần Thị Bích',
      role: 'Vợ/Chồng',
      dob: '22/08/1978',
      gender: 'Nữ',
      idCard: '001078054321',
      idIssueDate: '15/06/2021',
      idIssuePlace: 'Cục CS QLHC về TTXH',
      ethnicity: 'Kinh',
      religion: 'Phật giáo',
      occupation: 'Giáo viên',
      workplace: 'Trường THCS La Khê',
      registrationDate: '01/01/2010',
      previousAddress: 'Số 20, Phố Bạch Mai, Quận Hai Bà Trưng, Hà Nội',
    },
    {
      id: 'm3',
      name: 'Nguyễn Minh Tuấn',
      role: 'Con',
      dob: '10/09/2005',
      gender: 'Nam',
      idCard: '001205098765',
      idIssueDate: '12/09/2021',
      idIssuePlace: 'Cục CS QLHC về TTXH',
      ethnicity: 'Kinh',
      religion: 'Không',
      occupation: 'Học sinh',
      workplace: 'Trường THPT Hà Đông',
      registrationDate: '15/09/2005',
      previousAddress: 'Sinh tại địa chỉ thường trú',
    },
    {
      id: 'm4',
      name: 'Nguyễn Thị Mai',
      role: 'Con',
      dob: '25/12/2010',
      gender: 'Nữ',
      idCard: '001210123456',
      idIssueDate: '26/12/2024',
      idIssuePlace: 'Cục CS QLHC về TTXH',
      ethnicity: 'Kinh',
      religion: 'Không',
      occupation: 'Học sinh',
      workplace: 'Trường THCS La Khê',
      registrationDate: '01/01/2011',
      previousAddress: 'Sinh tại địa chỉ thường trú',
    },
  ],
};

// News Items
export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'Họp tổ dân phố quý 4/2024',
    summary: 'Thông báo họp tổ dân phố định kỳ vào 19h00 ngày 28/12/2024 tại Nhà văn hóa.',
    date: '20/12/2024',
    type: 'meeting',
  },
  {
    id: 'n2',
    title: 'Tiêm chủng vắc-xin cúm mùa',
    summary: 'Trạm y tế phường tổ chức tiêm vắc-xin cúm miễn phí cho người cao tuổi.',
    date: '18/12/2024',
    type: 'health',
  },
  {
    id: 'n3',
    title: 'Thu tiền điện tháng 12',
    summary: 'Thông báo thu tiền điện từ ngày 25-30/12. Vui lòng chuẩn bị trước.',
    date: '15/12/2024',
    type: 'payment',
  },
];

// All Households for Admin
export const allHouseholds: Household[] = [
  currentHousehold,
  {
    id: 'hh-002',
    code: 'TDP7-2024-002',
    address: 'Số 12, Ngõ 5, Đường Lê Trọng Tấn, Phường La Khê',
    members: [
      {
        id: 'm5',
        name: 'Lê Văn Cường',
        role: 'Chủ hộ',
        dob: '08/11/1980',
        gender: 'Nam',
        idCard: '001080112233',
        idIssueDate: '10/03/2021',
        idIssuePlace: 'Cục CS QLHC về TTXH',
        ethnicity: 'Kinh',
        religion: 'Không',
        occupation: 'Doanh nhân',
        workplace: 'Công ty TNHH Thương mại ABC',
        registrationDate: '15/06/2015',
        previousAddress: 'Số 8, Ngô Quyền, Quận Hoàn Kiếm',
      },
      {
        id: 'm6',
        name: 'Phạm Thị Hương',
        role: 'Vợ/Chồng',
        dob: '14/02/1982',
        gender: 'Nữ',
        idCard: '001082445566',
        idIssueDate: '12/03/2021',
        idIssuePlace: 'Cục CS QLHC về TTXH',
        ethnicity: 'Kinh',
        religion: 'Không',
        occupation: 'Kế toán',
        workplace: 'Công ty TNHH Thương mại ABC',
        registrationDate: '15/06/2015',
        previousAddress: 'Số 15, Trần Phú, Quận Ba Đình',
      },
    ],
  },
  {
    id: 'hh-003',
    code: 'TDP7-2024-003',
    address: 'Số 15, Ngõ 7, Đường Lê Trọng Tấn, Phường La Khê',
    members: [
      {
        id: 'm7',
        name: 'Hoàng Văn Đức',
        role: 'Chủ hộ',
        dob: '20/05/1968',
        gender: 'Nam',
        idCard: '001068778899',
        idIssueDate: '05/04/2021',
        idIssuePlace: 'Cục CS QLHC về TTXH',
        ethnicity: 'Kinh',
        religion: 'Thiên Chúa',
        occupation: 'Hưu trí',
        workplace: 'Đã nghỉ hưu',
        registrationDate: '01/01/2000',
        previousAddress: 'Số 3, Láng Hạ, Quận Đống Đa',
      },
    ],
  },
];

// Pending Requests
export const pendingRequests: Request[] = [
  {
    id: 'req-001',
    type: 'tam_vang',
    applicantName: 'Nguyễn Minh Tuấn',
    householdCode: 'TDP7-2024-001',
    submittedAt: '22/12/2024 09:30',
    status: 'pending',
    details: {
      fromDate: '25/12/2024',
      toDate: '05/01/2025',
      reason: 'Đi học tập trung tại TP.HCM',
      destination: 'Ký túc xá ĐHQG TP.HCM',
    },
  },
  {
    id: 'req-002',
    type: 'tam_tru',
    applicantName: 'Trần Văn Hùng',
    householdCode: 'TDP7-2024-002',
    submittedAt: '21/12/2024 14:15',
    status: 'pending',
    details: {
      guestName: 'Trần Văn Hùng',
      guestDob: '15/06/1995',
      guestGender: 'Nam',
      guestIdCard: '036095123456',
      permanentAddress: 'Xã Đông Hà, Huyện Đông Hưng, Thái Bình',
    },
  },
  {
    id: 'req-003',
    type: 'dat_lich',
    applicantName: 'Lê Văn Cường',
    householdCode: 'TDP7-2024-002',
    submittedAt: '20/12/2024 10:00',
    status: 'pending',
    details: {
      service: 'Hội trường đám cưới',
      date: '15/01/2025',
      startTime: '10:00',
      endTime: '14:00',
      fee: 500000,
    },
  },
];

// Booking Slots
export const bookingSlots: BookingSlot[] = [
  { id: 'bs-001', service: 'Hội trường', date: '28/12/2024', startTime: '08:00', endTime: '12:00', status: 'booked', bookedBy: 'Nguyễn Văn An' },
  { id: 'bs-002', service: 'Sân cầu lông', date: '28/12/2024', startTime: '17:00', endTime: '19:00', status: 'booked', bookedBy: 'Lê Văn Cường' },
  { id: 'bs-003', service: 'Phòng họp', date: '29/12/2024', startTime: '14:00', endTime: '16:00', status: 'available' },
];

// Assets
export const assets: Asset[] = [
  { id: 'a1', name: 'Loa di động', category: 'Âm thanh', totalQuantity: 5, brokenQuantity: 1, notes: '1 loa bị hỏng micro' },
  { id: 'a2', name: 'Bàn gấp', category: 'Nội thất', totalQuantity: 30, brokenQuantity: 3, notes: '3 bàn gãy chân' },
  { id: 'a3', name: 'Ghế nhựa', category: 'Nội thất', totalQuantity: 100, brokenQuantity: 5, notes: '5 ghế bị nứt' },
  { id: 'a4', name: 'Quạt đứng', category: 'Điện tử', totalQuantity: 8, brokenQuantity: 0, notes: 'Tình trạng tốt' },
  { id: 'a5', name: 'Máy chiếu', category: 'Điện tử', totalQuantity: 2, brokenQuantity: 0, notes: 'Hoạt động bình thường' },
];

// Statistics for Admin
export const statistics = {
  totalHouseholds: 412,
  totalResidents: 1723,
  tempResidents: 45,
  pendingRequests: 8,
  ageDistribution: [
    { name: 'Mầm non', count: 89, range: '0-5' },
    { name: 'Cấp 1', count: 156, range: '6-10' },
    { name: 'Cấp 2', count: 142, range: '11-14' },
    { name: 'Cấp 3', count: 128, range: '15-18' },
    { name: 'Lao động', count: 987, range: '19-60' },
    { name: 'Nghỉ hưu', count: 221, range: '60+' },
  ],
  genderDistribution: [
    { name: 'Nam', value: 845 },
    { name: 'Nữ', value: 878 },
  ],
};

// Services and Fees
export const services = [
  { id: 's1', name: 'Hội trường đám cưới', fee: 500000, unit: 'lượt' },
  { id: 's2', name: 'Sân cầu lông', fee: 100000, unit: 'giờ' },
  { id: 's3', name: 'Phòng họp', fee: 200000, unit: 'buổi' },
];
