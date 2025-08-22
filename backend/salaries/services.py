from salaries.models import WorkerSalary

def recalculate_salaries_for_order(order):
    WorkerSalary.objects.filter(
        ordered_service__order=order
    ).delete()

    for ordered_service in order.orderedservicebyclient_set.all():
        commission = ordered_service.final_commission
        price = ordered_service.final_price
        if not commission:
            continue

        total_salary = price * (commission / 100)
        workers = ordered_service.workers.all()
        if not workers.exists():
            continue

        per_worker_salary = total_salary / workers.count()
        for worker in workers:
            WorkerSalary.objects.create(
                worker=worker,
                ordered_service=ordered_service,
                salary_amount=per_worker_salary
            )
