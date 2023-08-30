using carro_test_api.Context;
using carro_test_api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace carro_test_api.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected DataContext _context = null;
        protected DbSet<T> table = null;
        public GenericRepository(DataContext context) 
        {
            _context = context;
            table = _context.Set<T>();
        }

        public void Delete(object id)
        {
            T existing = table.Find(id);
            if (existing != null) 
            {
                table.Remove(existing);
            }
        }

        public IQueryable<T> GetAll()
        {
            return table.AsQueryable();
        }

        public T GetById(object id)
        {
            return table.Find(id);
        }

        public void Insert(T obj)
        {
            table.Add(obj);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Update(T obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }
    }
}
