# Component Specifications - Minimal Design

## 1. JobCard Component
```jsx
<JobCard 
  title="Web Developer Needed"
  budget="$500-$2000" 
  status="OPEN"
  proposals={5}
  deadline="2024-01-15"
  onClick={() => {}}
/>
```

## 2. ProposalCard Component  
```jsx
<ProposalCard
  freelancer="John Doe"
  amount="$1500"
  status="PENDING"
  coverLetter="I can help..."
  onAccept={() => {}}
  onReject={() => {}}
/>
```

## 3. DataTable Component
```jsx
<DataTable
  data={jobs}
  columns={['title', 'budget', 'status']}
  onRowClick={(job) => {}}
  pagination={true}
/>
```

## 4. SearchBar Component
```jsx
<SearchBar
  placeholder="Search jobs..."
  filters={['status', 'budget', 'location']}
  onSearch={(query, filters) => {}}
  suggestions={['React', 'Node.js']}
/>
```

## 5. StatusBadge Component
```jsx
<StatusBadge 
  status="OPEN" // OPEN, ASSIGNED, COMPLETED
  variant="success" // success, warning, danger
/>
```

## 6. ActionButton Component
```jsx
<ActionButton
  variant="primary" // primary, secondary, danger
  size="md" // sm, md, lg
  loading={false}
  onClick={() => {}}
>
  Submit Proposal
</ActionButton>
```

## 7. FormModal Component
```jsx
<FormModal
  title="Create Job"
  isOpen={true}
  onClose={() => {}}
  onSubmit={(data) => {}}
  fields={[
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'budget', type: 'number' }
  ]}
/>
```

## 8. PageHeader Component
```jsx
<PageHeader
  title="My Jobs"
  subtitle="Manage your job postings"
  actions={[
    { label: 'Create Job', onClick: () => {} }
  ]}
  breadcrumbs={['Dashboard', 'Jobs']}
/>
```

## Color System (3 colors only)
- **Primary**: #3B82F6 (Blue)
- **Success**: #10B981 (Green)  
- **Danger**: #EF4444 (Red)
- **Gray**: 50, 100, 200, 500, 900

## Typography (2 fonts only)
- **Headings**: Inter Bold
- **Body**: Inter Regular

This covers 100% of the UI with just 8 components!